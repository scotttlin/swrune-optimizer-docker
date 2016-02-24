// perform the optimizations
	$('#rune_optimize').on( 'click', function(e) {
		e.preventDefault();
		// validate monster
		if( $("#opt_monster").val() == "" || $("#opt_monster").val() == "0"){
			alert("Selected monster is required.");
			return false;
		}
		// validate preferences
		if( $("#opt_set1").val() == "" && $("#opt_set2").val() == "" && $("#opt_set3").val() == "" && $("#opt_slot2").val() == "" && $("#opt_slot4").val() == "" && $("#opt_slot6").val() == ""){
			alert("Selected at least one set or main stat for slot 2,4 or 6");
			return false;
		}
		// validate requested sets
		var requestedSetTypes = {"Energy": 0,"Fatal":0,"Blade":0,"Rage":0,"Swift":0,"Focus":0,"Guard":0,"Endure":0,"Violent":0,"Will":0,"Nemesis":0,"Shield":0,"Revenge":0,"Despair":0,"Vampire":0};
		if( $("#opt_set1").val() != "")
			requestedSetTypes[$("#opt_set1").val()] += allSets[$("#opt_set1").val()][0];
		if( $("#opt_set2").val() != "")
			requestedSetTypes[$("#opt_set2").val()] += allSets[$("#opt_set2").val()][0];
		if( $("#opt_set3").val() != "")
			requestedSetTypes[$("#opt_set3").val()] += allSets[$("#opt_set3").val()][0];
		var totalRequestedSlots = totalRunes(requestedSetTypes);
		if(totalRequestedSlots > 6){
			alert("Selected sets require more than 6 sots!");
			return;
		}
		var startTime = new Date().getTime();

		//var extendedMonsters = optimize(gridRunes, gridMons, $('#opt_monster').val(), requestedSetTypes);		
		// get optimized monster
		var monster = getRowDataById(gridMons, $('#opt_monster').val());
		
		// get 6 sets of possible runes, 1 for each slot
		var sixSetsOfRunes = pickCandidateRunes(gridRunes, requestedSetTypes, $('#opt_monster').val());
		
		for(var i=0; i<sixSetsOfRunes.length;i++) {
			if( sixSetsOfRunes[i].length == 0) {
				alert("There are no runes matching your preferences for slot " + (i+1) + "!");
				return;
			}
		}
		
		// find all possible permutations based on the 6 slot sets and requested set types
		var allRunePermutations = getPossiblePermutations(sixSetsOfRunes, requestedSetTypes);
			
		if(allRunePermutations.length > 0) {
    		var extendedMonsters = [];
    
    		var length = allRunePermutations.length;
    		var index = 0;
    		var displayBuilds = function() {
    			gridOpt = initOptTable(extendedMonsters);	
    					
    			var endTime = new Date().getTime();
    			var time = endTime - startTime;
    			$("#opt_time").html("Builds loaded in "+ time + "ms.");
    		};
    		var process = function() {
    			for (; index < length; index++) {
    					// make copy of the monster and extend it
    				var monster_x = extendMonster( JSON.parse(JSON.stringify(monster)), allRunePermutations[index]);
    				// check for max values
    				if( !( monster_x.m_crate > Number($('#opt_max_crate').val()) || monster_x.m_acc > Number($('#opt_max_acc_res').val()) || monster_x.m_res > Number($('#opt_max_acc_res').val()) ) ) {
    					extendedMonsters.push( monster_x );
    				}
    				
    				if (index + 1 < length && index % 100 == 0) {
    					$("#opt_time").html("Calculating builds stats " + index + "/" + length + ". Press Abort to stop.");
    					asyncProcess = setTimeout(process, 1);
    					index++
    					break;
    				}
    				
    				if(index + 1 == length) {
    					$("#opt_time").html("Preparing builds for display. This may take some time and slow your browser.");
    	
    					asyncProcess = setTimeout(displayBuilds, 1);
    				}
    			}
    		};
    		process();
		}else {
		    var endTime = new Date().getTime();
			var time = endTime - startTime;
			$("#opt_time").html("No possible builds found.");
			gridOpt.rows().clear().draw();
		}
	});
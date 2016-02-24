#!/bin/bash

VOLUME_HOME="/var/lib/mysql"

sed -ri -e "s/^upload_max_filesize.*/upload_max_filesize = ${PHP_UPLOAD_MAX_FILESIZE}/" \
    -e "s/^post_max_size.*/post_max_size = ${PHP_POST_MAX_SIZE}/" \
    -e "s/^max_execution_time.*/max_execution_time = ${PHP_MAX_EXECUTION_TIME}/" \
    -e "s/^max_input_time.*/max_input_time = ${PHP_MAX_INPUT_TIME}/" \
    -e "s/^memory_limit.*/memory_limit = ${PHP_MEMORY_LIMIT}" /etc/php5/apache2/php.ini

if [[ ! -d $VOLUME_HOME/mysql ]]; then
    echo "=> An empty or uninitialized MySQL volume is detected in $VOLUME_HOME"
    echo "=> Installing MySQL ..."
    mysql_install_db > /dev/null 2>&1
    echo "=> Done!"
    /create_mysql_admin_user.sh
else
    echo "=> Using an existing volume of MySQL"
fi

exec supervisord -n

# Ejecución Servidores
Para inicializar los servidores se puede utilizar el comando mvn spring-boot:run, y si se necesita que la aplicacion corra en un puerto distinto al predefinido (8080) se puede utilizar el comando spring-boot:run -Dspring-boot.run.arguments=--server.port="puerto nuevo", tambien en el archivo .properties se debe poner el nombre de la base de datos a utilizar en MySql, asi como el usurio y la contraseñna del root que se desee utilizar 
# Ejecución Usuarios
Para inicializar los usuarios se necesita en primer lugar tener descargado en la maquina a utilizar Node js, para posteriormente utilizar el comando npm start
# Ejecución LoadBalancer
Para inicializar el balanceador de cargas, se utiliza el comando mvn spring-boot:run, y posteriormete en el archivo .yml en la seccion llamda listOfServers, se ponen los servidores a utilizar separados por comas
# Agregar un administrador
Desde el programa de usuarios no se permite crear administradores, si se desea realizar esto, se puede utilizar el API Postman, utilizando un metodo post, con una URL [escriba la ip del servidor]:[escriba el puerto del servidor]/auth/nuevo y despues en body se escribe en formato json {"nombre": "admin", "nombreUsuario": "admin", "email": "a@a.a", "password": "admin", "roles": ["admin"]}

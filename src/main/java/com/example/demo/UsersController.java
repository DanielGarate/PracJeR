package com.example.demo;

import java.util.Collection;
import java.util.HashMap;
import java.io.BufferedWriter;
import java.io.BufferedReader;
import java.io.FileWriter;
import java.util.Scanner;
import java.io.FileReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.Writer;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UsersController {

	//Map<Long, User> users = new ConcurrentHashMap<>(); 
	Map<String, User> users = new ConcurrentHashMap<>(); 
	Map<String, User> activeUsers = new HashMap<String, User>();
	static String usersFileURL = "src/main/resources/static/text.txt";
	AtomicLong nextId = new AtomicLong(0);
	
	public UsersController() 
	{
		try 
		{
			File obj = new File(usersFileURL);
			Scanner reader = new Scanner(obj);
			
			while (reader.hasNextLine()) {
				//Creamos usuario temporal desde el txt
				String data[] = reader.nextLine().split(";");
				User auxUser = new User(data[0], data[1]);
				
				users.put(auxUser.getName(), auxUser);
				
			}
			reader.close();
			
		}catch(FileNotFoundException e) 
		{
			System.out.println("Error reading the users");
			e.printStackTrace();
		}
	}
	@GetMapping
	public Collection<User> users() {
		return users.values();
	}
	@GetMapping("/users")
	public Map<String, User> getUsers(){
		return users;
	}
	@GetMapping("/activeUsers")
	public Map<String, User> getActiveUsers(){
		return activeUsers;
	}
	long id;
	@PostMapping
	//@PostMapping("/users")
	//@ResponseStatus(HttpStatus.CREATED)
	public boolean nuevoUser(@RequestBody User user) {

		//id= nextId.incrementAndGet();
		//user.setId(id);
		//users.put(id, user);
		
		//escribirArchivo("Manolo", "124");
		//escribirArchivo(user.getId(), user.getName(), user.getPassword()); 
		
		
		String nickname = user.getName();	// Uses the user nick as key
    	String password = user.getPassword();
    	System.out.println(nickname);
    	if(!users.containsKey(nickname)) // if the user doesn't exist
    	{
    		users.put(nickname, user); // we add the new user
    		activeUsers.put(nickname, user);
    		
    		// Add user to the txt file
            try (Writer writer = new BufferedWriter(new FileWriter(usersFileURL, true))) // "true" parameter is for appending
            {
                String contents = "";
                contents = user.getName() + ";" + user.getPassword() + ";"  + System.getProperty("line.separator");
                
                writer.write(contents);
                writer.close();
                System.out.println("User written succesfully");
                
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("Error writing user");
            }
        	

    		return true; // we create the user and continue to the next scene
    		
    	} else { // the user exists
    		if(users.get(nickname).getPassword().equals(password)) { // if the password given matches the stored one
    	    	activeUsers.put(nickname, user);

    			return true; // we can change the scene
    		} else // if the password isn't the same
    			return false; // we can't change the scene
    	}
		//return true;
	}
	


	@PutMapping("/{id}") // no usando
	public ResponseEntity<User> actulizaUser(@PathVariable long id, @RequestBody User userActualizado) {

		User savedUser = users.get(userActualizado.getId());

		if (savedUser != null) {

			//users.put(id, userActualizado);

			return new ResponseEntity<>(userActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<User> borraUser(@PathVariable long id) {

		User savedUsers = users.get(id);

		if (savedUsers != null) {
			users.remove(savedUsers.getId());
			
			return new ResponseEntity<>(savedUsers, HttpStatus.OK);
			
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	
	
	public static void escribirArchivo(Long id, String nombre, String contrasenya) {
		
	    File log = new File(usersFileURL); //CREAMOS ARCHIVO
	    	    try{
	    	    if(log.exists()==false){ //si no existe el archivo, lo crea
	    	            System.out.println("We had to make a new file.");
	    	            log.createNewFile();
	    	    } //si existe buscame el nombre
	    	    
	    	    if(chekeadorPalabra(nombre) == false) { //CEHACEKADOR DE PALABRA RECIBE UNA PALABRA y retorna un bool si esta o no
	    	    	FileWriter fileWriter = new FileWriter(log, true);
	 	    	    BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
	 	    	    bufferedWriter.write(/*id + "-" + */nombre+"#"+ contrasenya + "-");// + "\n"); //escribe el nombre u contrasena
	 	    	    bufferedWriter.close();
	    		}else {
	    			if(chekeadorPalabra(nombre+"#"+contrasenya) == false){ //chekeador de palabra tmb podemos chekear contrasenas
	    				System.out.println("Contasna incorrecta"); //si llegar hasta aui significa que coincide el nombre 
	    				
	    				//AAUI VA COMUNICARSE CON EL JUEGO PARA QUE NO LE DEJE PASAR
	    			}else {
	    				System.out.println("sesion inciada");//si llegar hasta aui significa que coincide el nombre y contraseña AGREGAR AQUI ALGO DE INICIO SESION
	    				
	    			}
	    			
	    		}
	    	    
	    	    //aqui escribo
	    	   
	    	    }catch(IOException e){
	    	        System.out.println("COULD NOT LOG!!");
	    	    }
	}
	public static boolean chekeadorPalabra(String palabra) {
		boolean escribo = false;
		try{
	    File log = new File("test.txt");
	    //File file = new File("test.txt");
	    
	    //buscador de palabras
 		String[] words=null;
 		String input= palabra; //palabra a buscra
 		int count=0;
        // Creating an object of BufferedReader class
        BufferedReader br
            = new BufferedReader(new FileReader(log));
        
        // Declaring a string variable
        String st;
        // Condition holds true till
        // there is character in a string
        while ((st = br.readLine()) != null) {
        	// Print the string
            //System.out.println(st);
        	words=st.split("#|\\-" );  //Split the word using space
            for (String word : words) 
            {
                   if (word.equals(input))   //Search for the given word
                   {
                     count++;    //If Present increase the count by one
                   }
            }
            
        }
        if(count!=0)  //Check for count not equal to zero
        {
           System.out.println("The given word is present for "+count+ " Times in the file");
           escribo = true; 
        }
        else
        {
           System.out.println("The given word is not present in the file");
           escribo = false; //si la palabra no existe, la escribo
        }
        br.close();
		}catch(IOException e){
	        System.out.println("COULD NOT LOG!!");
	    }
		return escribo;
	}
	
}



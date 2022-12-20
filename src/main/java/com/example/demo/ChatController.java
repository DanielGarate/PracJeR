package com.example.demo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class ChatController {
	//Map<Long, User> users = new ConcurrentHashMap<>(); 
	Map<Long, Chat> msg = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<Chat> messages() {
		return msg.values();
	}
	

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public boolean newMsg(@RequestBody Chat chat) {

		long id = nextId.incrementAndGet();
		chat.setId(id);
		msg.put(id, chat);
		
		//escribirArchivo("Manolo", "124");
		escribirArchivo(chat.getUsuario1(), chat.getMUsuario1()); //FALTA METER COMO METER LA CONTRASEÑA
		
		return true;
	}
	/*
	@PutMapping("/{id}")
	public ResponseEntity<User> actulizaUser(@PathVariable long id, @RequestBody User userActualizado) {

		User savedUser = msg.get(userActualizado.getId());

		if (savedUser != null) {

			msg.put(id, userActualizado);

			return new ResponseEntity<>(userActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	*/
	
	@GetMapping("/{id}")
	public ResponseEntity<Chat> getChat(@PathVariable long id) {

		Chat savedMsg = msg.get(id);
		if (savedMsg != null) {
			return new ResponseEntity<>(savedMsg, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	/*
	@DeleteMapping("/{id}")
	public ResponseEntity<User> borraUser(@PathVariable long id) {

		User savedUsers = msg.get(id);

		if (savedUsers != null) {
			msg.remove(savedUsers.getId());
			return new ResponseEntity<>(savedUsers, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	*/
	
	
	public static void escribirArchivo(String user, String chathist) {
		
	    File log = new File("chat.txt"); //CREAMOS ARCHIVO
	    	    try{
	    	    if(log.exists()==false){ //si no existe el archivo, lo crea
	    	            System.out.println("We had to make a new file.");
	    	            log.createNewFile();
	    	    } //si existe buscame el nombre
	    	    FileWriter fileWriter = new FileWriter(log, true);
 	    	    BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
 	    	    bufferedWriter.write(user + ": " + chathist + "\n");// + "\n"); //escribe el nombre u contrasena
 	    	    bufferedWriter.close();
	    	    /*if(chekeadorPalabra(nombre) == false) { //CEHACEKADOR DE PALABRA RECIBE UNA PALABRA y retorna un bool si esta o no
	    	    	
	    		}else {
	    			if(chekeadorPalabra(contrasenya) == false){ //chekeador de palabra tmb podemos chekear contrasenas
	    				System.out.println("Contasna incorrecta"); //si llegar hasta aui significa que coincide el nombre 
	    				
	    				//AAUI VA COMUNICARSE CON EL JUEGO PARA QUE NO LE DEJE PASAR
	    			}else {
	    				System.out.println("sesion inciada");//si llegar hasta aui significa que coincide el nombre y contraseña AGREGAR AQUI ALGO DE INICIO SESION
	    				
	    			}
	    			
	    		}
	    	    */
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
        	words=st.split("-");  //Split the word using space
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

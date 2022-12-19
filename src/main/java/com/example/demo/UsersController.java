package com.example.demo;

import java.util.Collection;
import java.io.FileWriter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.io.FileWriter;
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

@RestController
@RequestMapping("/users")
public class UsersController {

	Map<Long, User> users = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<User> users() {
		return users.values();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public boolean nuevoUser(@RequestBody User user) {

		long id = nextId.incrementAndGet();
		user.setId(id);
		users.put(id, user);
		
		try {
		FileWriter document = new FileWriter("users.txt");
		
		document.write(user.toString());
		document.close();
			
		}catch(IOException e){
			
			System.err.println("Error en la escritura");
			
		}
	
		return true;
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> actulizaUser(@PathVariable long id, @RequestBody User userActualizado) {

		User savedUser = users.get(userActualizado.getId());

		if (savedUser != null) {

			users.put(id, userActualizado);

			return new ResponseEntity<>(userActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUsers(@PathVariable long id) {

		User savedUsers = users.get(id);

		if (savedUsers != null) {
			return new ResponseEntity<>(savedUsers, HttpStatus.OK);
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

}

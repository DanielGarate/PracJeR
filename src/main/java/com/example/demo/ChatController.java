package com.example.demo;
import org.springframework.web.bind.annotation.*;
import java.io.*;
import java.util.Stack;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
@RestController
public class ChatController {
	
	Stack<String> messages = new Stack<String>();
	String chatFileURL = "src/main/resources/static/chat.txt"; 
	
	@GetMapping
	public Stack<String> messages() //@PathVariable("i") String i
	{
		return messages;
	}
	
	@PostMapping("/chat")
	public void postMessage(@RequestBody Chat chatter) throws FileNotFoundException {

		String contents = "";
        contents = chatter.getUser() + ": " + chatter.getMessage() + System.getProperty("line.separator");
        try (Writer writer = new BufferedWriter(new FileWriter(chatFileURL, true))) 
        {
            writer.write(contents);
            writer.close();
            //System.out.println("User written succesfully"); //cuando escribe bien avisa 

        } catch (IOException e) {
            e.printStackTrace();
            //System.out.println("Error writing user");
        }
        messages.add(contents);
	}
	@GetMapping("/chat/{i}")
	public String getMessage(@PathVariable("i") String i) {
		
		int size = messages.size();
		
		String message = "";
		if(i.equals("0") && size>=1) {
			message = messages.get(size-1);
		}
		if(i.equals("1") && size>=2) {
			message = messages.get(size-2);
		}
		if(i.equals("2") && size>=3) {
			message = messages.get(size-3);
		}
		if(i.equals("3") && size>=4) {
			message = messages.get(size-4);
		}
		if(i.equals("4") && size>=5) {
			message = messages.get(size-5);
		}
		if(i.equals("5") && size>=6) {
			message = messages.get(size-6);
		}
		if(i.equals("6") && size>=7) {
			message = messages.get(size-7);
		}
		if(i.equals("7") && size>=8) {
			message = messages.get(size-8);
		}
			
		return message; 
	}
}

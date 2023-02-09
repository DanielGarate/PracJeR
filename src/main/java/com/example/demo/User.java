package com.example.demo;

public class User {

	private long id;
	private String name;
	private String password;

	public User() {
	}
	
	public User(String _name, String _password) 
	{
		this.name = _name;
	    this.password = _password;
	}
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String _name) {
		this.name = _name;
	}
	
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String _password) {
		this.password = _password;
	}


	@Override
	public String toString() {
		return id + "/" + name + "/"  + password + "\n";
	}

}

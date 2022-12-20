package com.example.demo;

public class Chat {

	private long id;
	private String user;
	private String mensage;
	
	public Chat() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setUsuario1(String usuario1) {
		this.user = usuario1;
	}

	public String getUsuario1() {
		return user;
	}
	
	public void setMUsuario1(String mensjes1) {
		this.mensage = mensjes1;
	}

	public String getMUsuario1() {
		return user;
	}



	@Override
	public String toString() {
		return user + ": " + mensage + "/" +"\n";
	}

}

package com.myshop;

import com.myshop.products.Product;
import com.myshop.products.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class MyShopApplication{

	public static void main(String[] args) {
		SpringApplication.run(MyShopApplication.class, args);
	}

}

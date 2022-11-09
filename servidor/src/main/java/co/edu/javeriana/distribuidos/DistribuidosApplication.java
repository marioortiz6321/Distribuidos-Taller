package co.edu.javeriana.distribuidos;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DistribuidosApplication {

	public static void main(String[] args) {
		SpringApplication.run(DistribuidosApplication.class, args);
	}

}

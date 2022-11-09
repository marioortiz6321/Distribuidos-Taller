package com.codeusingjava;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.codeusingjava.config.RibbonConfiguration;

@SpringBootApplication(scanBasePackages= {
		"com.netflix.client.config.IClientConfig"
})
@RestController
@RibbonClient(name="distribuidos",configuration=RibbonConfiguration.class)
public class LoadBalancerApplication {

	@Autowired
	private RestTemplate restTemplate;
	@GetMapping("/port")
	public String getPort() {
		System.out.println("Llamada al servidor...");
		return restTemplate.getForObject("http://distribuidos/auth/port", String.class);
	}
	
	@Bean
	@LoadBalanced
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
	public static void main(String[] args) {
		SpringApplication.run(LoadBalancerApplication.class, args);
	}

}
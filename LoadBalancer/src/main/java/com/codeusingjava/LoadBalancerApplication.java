package com.codeusingjava;

import com.codeusingjava.entity.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.codeusingjava.config.RibbonConfiguration;

import java.util.List;

@SpringBootApplication(scanBasePackages= {
		"com.netflix.client.config.IClientConfig"
})
@RestController
@RibbonClient(name="demo",configuration=RibbonConfiguration.class)
public class LoadBalancerApplication {

	@Autowired
	private RestTemplate restTemplate;


	//post method with rest template
	/*@PostMapping("/post")
	public String post() {
		String url = "http://demo/auth/nuevo";
		String response = restTemplate.postForObject(url, null, String.class);
		return response;
	}*/
	@GetMapping("/loadBalancingWithRibbon")
	public List<Producto> fetchReviwsUsingRestTemplate() {
		List<Producto> productos = restTemplate.getForObject("http://demo/producto/lista", List.class);
		return productos ;
	}
	//@GetMapping("/loadBalancingWithRibbon")
//	public String getData() {
//		return restTemplate.getForObject("http://demo/producto/lista", String.class);
//	}
	
	@Bean
	@LoadBalanced
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
	public static void main(String[] args) {
		SpringApplication.run(LoadBalancerApplication.class, args);
	}

}
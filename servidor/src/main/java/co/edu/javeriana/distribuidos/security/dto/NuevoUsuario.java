package co.edu.javeriana.distribuidos.security.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NuevoUsuario {
    @NotBlank
    private String nombre;
    @NotBlank
    private String nombreUsuario;
    @Email
    private String email;
    @NotBlank
    private String password;

    private Set<String> roles = new HashSet<>();
}

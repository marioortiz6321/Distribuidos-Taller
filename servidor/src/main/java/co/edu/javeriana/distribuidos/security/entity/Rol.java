package co.edu.javeriana.distribuidos.security.entity;

import co.edu.javeriana.distribuidos.security.enums.RolNombre;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Enumerated(EnumType.STRING)
    private RolNombre rolNombre;

    public Rol(@NotNull RolNombre roleNombre) {
        this.rolNombre = roleNombre;
    }
}

package co.edu.javeriana.distribuidos.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class ProductoDto {

    @NotBlank
    private String nombre;
    @Min(0)
    private Float existencias;

    public ProductoDto() {
    }

    public ProductoDto(@NotBlank String nombre, @Min(0) Float Existencias) {
        this.nombre = nombre;
        this.existencias = Existencias;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Float getExistencias() {
        return existencias;
    }

    public void setExistencias(Float existencias) {
        this.existencias = existencias;
    }
}

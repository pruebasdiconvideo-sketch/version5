package pe.cafeandino.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class DbRepository {

    private final ObjectMapper mapper;
    private Map<String, List<Map<String, Object>>> db;

    public DbRepository(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @PostConstruct
    void cargar() throws IOException {
        try (InputStream in = new ClassPathResource("db.json").getInputStream()) {
            db = mapper.readValue(in, new TypeReference<>() {});
        }
    }

    public synchronized Optional<List<Map<String, Object>>> coleccion(String nombre) {
        return Optional.ofNullable(db.get(nombre));
    }

    public synchronized Optional<Map<String, Object>> porId(String nombre, int id) {
        return coleccion(nombre).flatMap(lista ->
                lista.stream().filter(e -> ((Number) e.get("id")).intValue() == id).findFirst());
    }

    public synchronized Optional<Map<String, Object>> crear(String nombre, Map<String, Object> cuerpo) {
        return coleccion(nombre).map(lista -> {
            int siguiente = lista.stream().mapToInt(e -> ((Number) e.get("id")).intValue()).max().orElse(0) + 1;
            cuerpo.put("id", siguiente);
            lista.add(cuerpo);
            return cuerpo;
        });
    }

    public synchronized Optional<Map<String, Object>> actualizar(String nombre, int id, Map<String, Object> cambios) {
        return porId(nombre, id).map(existente -> {
            cambios.remove("id");
            existente.putAll(cambios);
            return existente;
        });
    }
}

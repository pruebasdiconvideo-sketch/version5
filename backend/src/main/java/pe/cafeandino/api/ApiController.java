package pe.cafeandino.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH})
public class ApiController {

    private final DbRepository repositorio;

    public ApiController(DbRepository repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping("/{coleccion}")
    public ResponseEntity<List<Map<String, Object>>> listar(@PathVariable String coleccion) {
        return repositorio.coleccion(coleccion).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{coleccion}/{id}")
    public ResponseEntity<Map<String, Object>> obtener(@PathVariable String coleccion, @PathVariable int id) {
        return repositorio.porId(coleccion, id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{coleccion}")
    public ResponseEntity<Map<String, Object>> crear(@PathVariable String coleccion, @RequestBody Map<String, Object> cuerpo) {
        return repositorio.crear(coleccion, cuerpo)
                .map(creado -> ResponseEntity.status(HttpStatus.CREATED).body(creado))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{coleccion}/{id}")
    public ResponseEntity<Map<String, Object>> actualizar(@PathVariable String coleccion, @PathVariable int id,
                                                          @RequestBody Map<String, Object> cambios) {
        return repositorio.actualizar(coleccion, id, cambios).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}

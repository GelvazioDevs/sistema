package apibase.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import apibase.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
        
    /**
     * Finds a Usuario by email and senha.
     *
     * @param email the email of the Usuario
     * @param senha the senha of the Usuario
     * @return an Optional containing the found Usuario, or empty if not found
     */    
    Optional<Usuario> findUsuarioByEmailAndSenha(String email, String senha);
}

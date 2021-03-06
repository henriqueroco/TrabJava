package trabjava.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import trabjava.model.Disciplina;
import java.util.Set;
import java.util.HashSet;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "curso")
@XmlRootElement
public class Curso implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column(nullable = false)
   private String nome;

   @Column
   private String descricao;

   @OneToMany
   private Set<Disciplina> disciplinas = new HashSet<Disciplina>();

   public Long getId()
   {
      return this.id;
   }

   public void setId(final Long id)
   {
      this.id = id;
   }

   public int getVersion()
   {
      return this.version;
   }

   public void setVersion(final int version)
   {
      this.version = version;
   }

   @Override
   public boolean equals(Object obj)
   {
      if (this == obj)
      {
         return true;
      }
      if (!(obj instanceof Curso))
      {
         return false;
      }
      Curso other = (Curso) obj;
      if (id != null)
      {
         if (!id.equals(other.id))
         {
            return false;
         }
      }
      return true;
   }

   @Override
   public int hashCode()
   {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((id == null) ? 0 : id.hashCode());
      return result;
   }

   public String getNome()
   {
      return nome;
   }

   public void setNome(String nome)
   {
      this.nome = nome;
   }

   public String getDescricao()
   {
      return descricao;
   }

   public void setDescricao(String descricao)
   {
      this.descricao = descricao;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (nome != null && !nome.trim().isEmpty())
         result += "nome: " + nome;
      if (descricao != null && !descricao.trim().isEmpty())
         result += ", descricao: " + descricao;
      return result;
   }

   public Set<Disciplina> getDisciplinas()
   {
      return this.disciplinas;
   }

   public void setDisciplinas(final Set<Disciplina> disciplinas)
   {
      this.disciplinas = disciplinas;
   }
}
package br.com.connekt.aplicacao.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Benefits.
 */
@Entity
@Table(name = "benefits")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Benefits implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "icon")
    private String icon;

    @ManyToOne
    @JsonIgnoreProperties("benefits")
    private Opportunities opportunities;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Benefits name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public Benefits icon(String icon) {
        this.icon = icon;
        return this;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Opportunities getOpportunities() {
        return opportunities;
    }

    public Benefits opportunities(Opportunities opportunities) {
        this.opportunities = opportunities;
        return this;
    }

    public void setOpportunities(Opportunities opportunities) {
        this.opportunities = opportunities;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Benefits benefits = (Benefits) o;
        if (benefits.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), benefits.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Benefits{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", icon='" + getIcon() + "'" +
            "}";
    }
}

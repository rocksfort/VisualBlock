package visualblock.web.rest;

import com.codahale.metrics.annotation.Timed;
import visualblock.domain.Person;
import visualblock.repository.PersonRepository;
import visualblock.web.rest.util.HeaderUtil;
import visualblock.web.rest.dto.PersonDTO;
import visualblock.web.rest.mapper.PersonMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Person.
 */
@RestController
@RequestMapping("/api")
public class PersonResource {

    private final Logger log = LoggerFactory.getLogger(PersonResource.class);

    @Inject
    private PersonRepository personRepository;

    @Inject
    private PersonMapper personMapper;

    /**
     * POST  /persons -> Create a new person.
     */
    @RequestMapping(value = "/persons",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<PersonDTO> createPerson(@Valid @RequestBody PersonDTO personDTO) throws URISyntaxException {
        log.debug("REST request to save Person : {}", personDTO);
        if (personDTO.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new person cannot already have an ID").body(null);
        }
        Person person = personMapper.personDTOToPerson(personDTO);
        Person result = personRepository.save(person);
        return ResponseEntity.created(new URI("/api/persons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("person", result.getId().toString()))
            .body(personMapper.personToPersonDTO(result));
    }

    /**
     * PUT  /persons -> Updates an existing person.
     */
    @RequestMapping(value = "/persons",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<PersonDTO> updatePerson(@Valid @RequestBody PersonDTO personDTO) throws URISyntaxException {
        log.debug("REST request to update Person : {}", personDTO);
        if (personDTO.getId() == null) {
            return createPerson(personDTO);
        }
        Person person = personMapper.personDTOToPerson(personDTO);
        Person result = personRepository.save(person);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("person", personDTO.getId().toString()))
            .body(personMapper.personToPersonDTO(result));
    }

    /**
     * GET  /persons -> get all the persons.
     */
    @RequestMapping(value = "/persons",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional(readOnly = true)
    public List<PersonDTO> getAllPersons() {
        log.debug("REST request to get all Persons");
        return personRepository.findAll().stream()
            .map(person -> personMapper.personToPersonDTO(person))
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * GET  /persons -> get all the persons.
     */
    @RequestMapping(value = "/persons/girls",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional(readOnly = true)
    public List<PersonDTO> getAllGirls() {
    	log.debug("REST request to get all Persons");
    	List<Person> girls = personRepository.findAll();
    	for (Person girl : girls) {
			Boolean gender = girl.getGender();
    		if (gender != null) {
				if (gender) {
					log.debug("[VISUAL BLOCK] person.gender IS true (male), removing from list.");
					girls.remove(girl);
				} else {
					log.debug("[VISUAL BLOCK] person.gender IS false (female), leaving in list.");
				}
			} else {
				log.error("[VISUAL BLOCK] person.gender IS NULL!");
			}
		}
//    	log.trace("-------- girls: [");
//    	for (Person girl : girls) {
//			log.trace(girl.toString() + ",");
//		}
//    	log.trace("] --------");
		return girls.stream()
    			.map(person -> personMapper.personToPersonDTO(person))
    			.collect(Collectors.toCollection(LinkedList::new));
    }
    
    /**
     * GET  /persons/:id -> get the "id" person.
     */
    @RequestMapping(value = "/persons/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<PersonDTO> getPerson(@PathVariable Long id) {
        log.debug("REST request to get Person : {}", id);
        return Optional.ofNullable(personRepository.findOne(id))
            .map(personMapper::personToPersonDTO)
            .map(personDTO -> new ResponseEntity<>(
                personDTO,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /persons/:id -> delete the "id" person.
     */
    @RequestMapping(value = "/persons/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
        log.debug("REST request to delete Person : {}", id);
        personRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("person", id.toString())).build();
    }
}

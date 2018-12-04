package br.com.connekt.aplicacao.service.impl;

import br.com.connekt.aplicacao.service.CustomersService;
import br.com.connekt.aplicacao.domain.Customers;
import br.com.connekt.aplicacao.repository.CustomersRepository;
import br.com.connekt.aplicacao.service.dto.CustomersDTO;
import br.com.connekt.aplicacao.service.mapper.CustomersMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Customers.
 */
@Service
@Transactional
public class CustomersServiceImpl implements CustomersService {

    private final Logger log = LoggerFactory.getLogger(CustomersServiceImpl.class);

    private final CustomersRepository customersRepository;

    private final CustomersMapper customersMapper;

    public CustomersServiceImpl(CustomersRepository customersRepository, CustomersMapper customersMapper) {
        this.customersRepository = customersRepository;
        this.customersMapper = customersMapper;
    }

    /**
     * Save a customers.
     *
     * @param customersDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CustomersDTO save(CustomersDTO customersDTO) {
        log.debug("Request to save Customers : {}", customersDTO);

        Customers customers = customersMapper.toEntity(customersDTO);
        customers = customersRepository.save(customers);
        return customersMapper.toDto(customers);
    }

    /**
     * Get all the customers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CustomersDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Customers");
        return customersRepository.findAll(pageable)
            .map(customersMapper::toDto);
    }


    /**
     * Get one customers by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustomersDTO> findOne(Long id) {
        log.debug("Request to get Customers : {}", id);
        return customersRepository.findById(id)
            .map(customersMapper::toDto);
    }

    /**
     * Delete the customers by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Customers : {}", id);
        customersRepository.deleteById(id);
    }
}

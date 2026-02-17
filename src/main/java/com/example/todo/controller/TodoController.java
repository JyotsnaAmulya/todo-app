package com.example.todo.controller;

import com.example.todo.entity.Todo;
import com.example.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Todo createTodo(@Valid @RequestBody Todo todo) {
        return service.createTodo(todo);
    }

    // GET ALL (optional filter)
    @GetMapping
    public List<Todo> getAllTodos(
            @RequestParam(required = false) Boolean completed) {
        return service.getAllTodos(completed);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id,
                           @RequestBody Todo todo) {
        return service.updateTodo(id, todo);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        service.deleteTodo(id);
    }
}

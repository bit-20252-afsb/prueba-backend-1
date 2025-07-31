import {jest, describe, it, expect, beforeEach} from '@jest/globals';

// OPERACIONES DE LA CALCULADORA

// Suma

// Resta

// Multiplicación

// División


// Operaciones CRUD

// CREATE

// READ

// UPDATE

// DELETE

describe('OPERACIÓN - SUMA', () => {
    let num1;
    let num2;
    let mockSumaExitosa;
    let text;

    // Arrange - Global
    beforeEach(()=>{
        num1 = 1;
        num2 = 2;
        mockSumaExitosa = 3;
        text = 'a'
    });
    
    it('Debería sumar los números correctamente', ()=>{
        // Arrange - Preparación
        // Act - Actuar
        const resultado = num1 + num2;
        // Assert - Verificar
        expect(resultado).toBe(mockSumaExitosa);
    });

    it('Debería realizar la suma con algún error / Sin funcionalidad adicional creada', ()=>{
        // Arrange - Preparación
        // Act - Actuar
        const resultado = num1 + text;
        // Assert - Verificar
        expect(typeof(resultado)).not.toBe(Number);
    })

    it('Debería realizar la suma con algún error / Con funcionalidad adicional creada', ()=>{
        expect(() => {
            // Arrange - Preparación
            // Act - Actuar
            if(typeof(num1) !== Number || typeof(text) !== Number){
                throw new Error("Suma no valida");
            }
            const resultado = num1 + text;
            return resultado;
        }).toThrow('Suma no valida');
    });
});

describe('OPERACIÓN - MULTIPLICACIÓN', () => {
    
    let num1, num2, mockMultiplicacionExitosa;
    beforeEach( ()=>{
        num1 = 1;
        num2 = 2;
        mockMultiplicacionExitosa = 2;
    });

    it('Debería realizar la multiplicación entre 2 números', () => {
        // Arrange
        // Act
        const resultado = num1*num2;
        // Assert
        expect(resultado).toBe(mockMultiplicacionExitosa);
        expect(typeof resultado).toBe("number") // Porque Javascript quiere que por alguna razon el tipo de dato sea un string no su instancia
    });
})


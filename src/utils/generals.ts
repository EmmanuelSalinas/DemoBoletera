export function scrollToRef(context: any, refName: string) {
    context.$nextTick(() => {
        // Accedemos a las refs a través del contexto que le pasamos
        const element = context.$refs[refName] as HTMLElement | undefined;

        if (element) {
            if (typeof element.scrollIntoView === "function") {
                element.scrollIntoView({ behavior: 'smooth' }); // ¡Puedes dejar el smooth activo!
            }
        }
    });
}

export function formatMoney(amount: string | number): string {
    // Si ya viene como string, lo retornamos directo sin formatear
    if (typeof amount === 'string') {
        return amount;
    }

    // Si es número (o cualquier otra cosa que pase la validación), lo formateamos
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}
export function unformatMoney(amount: any): any {
    // Eliminar caracteres no numéricos (excepto el punto decimal y el signo negativo)
            const typeValue = typeof amount;
            if (typeValue === "string") {
                let numberString = amount.replace(/[^0-9.-]+/g, "");
                // Convertir la cadena resultante en un número
                let number = parseFloat(numberString);
                return number;
            } else {
                return amount;
            }
}


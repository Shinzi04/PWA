export default{
    content: [
        "./src/index.html",
        "./src/**/*.{js,ts,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
            },
        },
    },
    plugins: [],
}
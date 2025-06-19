module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            }
        },
    },
    variants: {
        extend: {
            scale: ['group-hover'],
            translate: ['group-hover'],
            opacity: ['group-hover'],
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
};

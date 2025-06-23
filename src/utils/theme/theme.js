export const myTheme = {
    light: {
        colors: {
            myBg: {
                1: '#eaf7f7',
                2: '#CCFFFF',
                3: '#99CCFF',
                4: '#3399CC',
            },
            myText: {
                1: '#000000',
                3: '#001111',
                2: '#003366',
            },
            myBorder: {
                1: '#f5f5f5',
            },
            myPrimary: {
                1: '#ab908b',
                2: '#69514c',
            },
            myAccent: {
                1: '#F2CCB8',
                2: '#8e6d5b',
            },
        },
    },
    dark: {
        colors: {
            myBg: {
                1: '#FFCCCC',
                2: '#FF9999',
                3: '#FF6666',
                4: '#FF0033',
            },
            myText: {
                1: '#FFCCCC',
                3: '#cccccc',
                2: '#FF0033',
            },
            myBorder: {
                1: '#323232',
            },
        },
    },
    overrides1: {
        colors: {
            myBg: {
                1: '#44496b',
                2: '#555a7d',
                3: '#F2CCB8',
                4: '#c4c3c3',
            },
            myText: {
                1: '#FFFFFF',
                2: '#c4c3c3',
                3: '#69514c',
            },
            myBorder: {
                1: '#323232',
            },
            myPrimary: {
                1: '#ab908b',
                2: '#69514c',
            },
            myAccent: {
                1: '#F2CCB8',
                2: '#8e6d5b',
            },
        },
    },
};

export const safelist = () => {
    const arr = [];
    Object.keys(myTheme.default.colors).forEach((item) => arr.push(...Array.from({ length: 10 }, (_, i) => `bg-${item}-${i}`)));
    return arr;
};
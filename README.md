# Email Auto Fill

#### Available as an [NPM Package](https://www.npmjs.com/package/@mollahdev/email-auto-fill).

**Install with NPM:**

```sh
npm i @mollahdev/email-auto-fill
```

> A simple class to auto fill email address based on user input.
> This package assumes that your code will run in an ES2015+ environment.

### Import and Configure
```jsx
import EmailAutoFill from '@mollahdev/email-auto-fill';

const eaf = new EmailAutoFill({
    domains: [
        {
            name: 'gmail.com',
            autoCompleteAfter: 1, // define the number of characters to be typed before auto complete
            misspelledVariations: [
                'gmial.com',
                'gmai.com',
                'gamil.com',
                'gmal.com',
                'gamil.com',
                'gmail.cm',
                'mgail.com',
                'gmil.com',
                'gmail.om',
                'gmaill.com',
                'gmi.com',
                'gmail.co',
                'gmal.com',
                'gmali.com',
                'gml.com',
                'gmal.com',
                'gmali.com',
                'gma.com'
            ]
        },
        {
            name: 'yahoo.com',
            autoCompleteAfter: 2
        },
        {
            name: 'icloud.com',
            autoCompleteAfter: 2
        },
        {
            name: 'me.com',
            autoCompleteAfter: 2
        },
        {
            name: 'mac.com',
            autoCompleteAfter: 2
        },
        {
            name: 'outlook.com',
            autoCompleteAfter: 2
        },
        {
            name: 'protonmail.com',
            autoCompleteAfter: 2
        },
        {
            name: 'zohocorp.com',
            autoCompleteAfter: 2
        },
        {
            name: 'gmx.com',
            autoCompleteAfter: 2
        },
        {
            name: 'aoicorp.com',
            autoCompleteAfter: 2
        }
    ],
    /**
     * this subscribe method will be triggered when you receive any value by using dispatch method
     */ 
    subscribe( value ) {
        console.log(value)
    }
})

// dispatch method will trigger subscribe method if any suggesation or auto-fill available
eaf.dispatch('auto-fill', 'example@g')
eaf.dispatch('suggesation', 'example@gmi.com')

```

### Event List

- auto-fill
- suggesation

### auto-fill

'auto-fill' event generate a complete email address based on your input. e.g. if your input is example@gma, it will give you example@gmail.com. It will trigger the subscribe method once you complete username then @ sign then a character. e.g. example@y. You can use this event on input change.

```jsx
eaf.dispatch('auto-fill', 'example@g')

// subscribe method will give you this output
{
    "type": "auto-fill",
    "inValue": "example@g",
    "outValue": "example@gmail.com"
}
```

### suggesation

'suggesation' event generate a complete email address if the email domain is listed in the misspelledVariations property. e.g. if your input is example@gmai.com, it will give you example@gmail.com. You can use this event on form submit.

```jsx
eaf.dispatch('suggesation', 'example@gmi.com')

// subscribe method will give you this output
{
    "type": "suggesation",
    "inValue": "example@gmi.com",
    "outValue": "example@gmail.com"
}
```
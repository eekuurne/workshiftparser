# Workshiftparser

The application takes in a csv-file representing workshifts of one month and counts the monthly wage of
every employee involved. If you add multiple files, it will add them up without adding duplicate work shifts.
Refresh page to reset the list.

![alt tag](https://github.com/eekuurne/workshiftparser/blob/master/app/images/workshiftparser_screenshot.png)

## Data file format

Person Name, Person ID, Date, Start, End

![alt tag](https://github.com/eekuurne/workshiftparser/blob/master/app/images/data_example.png)

## Build & development

Run `npm install` and `bower install` before using grunt for the first time.

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Yeoman generator

The project template was generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

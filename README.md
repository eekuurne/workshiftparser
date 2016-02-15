# Workshiftparser

The application takes in a csv-file representing workshifts of one month and counts the monthly wage of
every employee involved. If you add multiple files, it will add them up without adding duplicate work shifts.
Refresh page to reset the list.

![alt tag](https://github.com/eekuurne/workshiftparser/blob/master/app/images/workshiftparser_screenshot.png)

## Data file format

Person Name, Person ID, Date, Start, End

Person Name => Textual Name of the Employee 
Person ID => Unique ID of the Employee
Date => DD.MM.YYYY, Work Shift Date
Start => HH:MM, Shift Start Time (24h)
End => HH:MM, Shift End Time (24h)

Example Data Row:
John Smith,8,26.3.2014,13:15,2:00

## Build & development

Run `grunt` for building and `grunt serve` for preview. 

Latest build is in the dist folder, where you can open the app with index.html.

## Testing

Running `grunt test` will run the unit tests with karma.

## Yeoman generator

The project template was generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.
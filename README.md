This is the basic structure of a vacation rental built in the next.js 
framework. uses typescript and tailwind for the scripting and stylings.

The datastructures require more optimization in the filters
sections as well as the main state holding all avaialbe units displayed.

There are two pages in this system. The default page pulls every unit 
when no date is selected from a seperate database that isnt connected to
the property management system to allow for this page to be crawled by 
browser crawlers easier and more quickly.

the second page pulls the available units from the pms and uses the database
to fill in the units information to prevent excessive pulls from the pms.

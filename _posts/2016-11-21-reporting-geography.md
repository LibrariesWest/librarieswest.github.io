---
layout: post
title: Reporting with Geography
author: Dave Rowe
---

LibrariesWest is a consortium of 7 library services: Bath and North East Somerset, Bristol, Dorset, North Somerset, Poole, Somerset, and South Gloucestershire.

## LibrariesWest authority types

Not only are these different local authorities, but they are different authority **types**, with very different geographical size, population, and demographics.  LibrariesWest is made up of 2 County Councils and 5 Unitary Authorities.  

| Authority | Authority Type | Population | Area (hectares) |
| --------- | -------------- | ---------- | --------------- |
| Bath and North East Somerset | Unitary Authority | 184.9K | 35.1K |
| Bristol | Unitary Authority | 449.3K | 23.5K |
| Dorset | County Council | 420.6K | 257.3K |
| North Somerset | Unitary Authority | 209.9K | 39.1K |
| Poole | Unitary Authority | 150.6K | 7.5K |
| Somerset | County Council | 545.4K | 351.4K |

For example, Somerset is a County Council, which tends to be a large area, where the Council is responsible for services such as education, transport, planning, fire and public safety, social care, libraries, waste management, and trading standards.  Within a County there will be individual District, Borough and City Councils working over smaller areas and responsible for services like rubbish collection, recycling, council tax collections, and housing.  A Unitary Authority, such as Bristol City is responsible for ALL services within that area (1 tier of local government).

For more information see [Types of Council](https://www.gov.uk/understand-how-your-council-works/types-of-council) on gov.uk.

These distinctions will be relevant to how each authority works, and in particular the demands put on their library services.  A city based unitary authority may have a greater number of users coming to them from outside the authority as a proportion of their users, while County Councils are likely to have a wider area to reach and greater resident spread.

The following map shows the boundary lines of each authority within LibrariesWest.

<iframe width="100%" height="520" frameborder="0" src="https://dxrowe.carto.com/viz/2f168e60-a769-11e6-843b-0e3ebc282e83/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

Bristol has an odd looking boundary line.  It stretches into the Bristol channel to the two islands, Flat Holm and Steep Holm.  When calculating the area of the authority it can be deceptive given that a large amount of this is the channel!

## Area profiling

Within each authority area there are a number of different geographical areas to split the authority.

| Area type | Description |
| --------- | ----------- |
| Administrative Boundaries | Aside from the boundary of the authority itself there will be sub-boundaries such as Wards and Parishes.  There are also 9 regional areas in England, all LibrariesWest authorities fall within the South West Region. |
| Census | Base unit areas called 'Output Areas' make up the ONS statistical 'Super Output Areas' released at two hierarchichal levels: Lower (contain ~1500 people) and Medium (contain ~7500 people).  These are designed to fit within administrative, ward, and parish boundaries and are very useful for local government.  Statistical data are released for these areas such as deprivation, age ranges, and ethnicity. |
| Postcode | Postcode geographies are at Area, District, Sector, and Unit level.  For example, the Somerset postcode TA1 3XZ is in the TA Area, the TA1 District, TA1 3 Sector and TA1 3XZ Unit. |

So, what associated data can be gained from using these areas? A few are shown below.

| Data | Area available at | Description |
| ---- | ----------------- | ----------- |
| Deprivation Indices | LSOA | The 2015 English Deprivation indices release comparative levels of deprivation for all Lower Layer Super Output Areas in England.  These are by deprivation type, for example health, education, income, crime, housing.  An index of multiple deprivation (IMD) is available which summarises all the deprivation types to produce an overall ranking for the LSOA.  These 32,844 ranked areas are then split into deciles to give a single 1-10 measure for each area (1 being within the most deprived, 10 being within the least). |
| Car/van availability | OA | Car availability per household is released at Output Area level describing the number of cars/vans available to each household. |
| Population (2011) | OA | Available at Output Area level, Census population data from 2011 is available from the ONS and available broken down by age and gender in each small area. |
| Estimated population (2015) | LSOA. | Annual mid-year population estimates are released by the ONS, broken down by age and gender and released at Lower Super Output Level.

## Embedding geography into reports

So how do we begin to use this geographical data?  Take a single example of a library transaction, an Issue of an item.  That transaction will have a number of parameters that have associated geographical data.

- The location of the library.  This can be exact coordinates of the library, which will allow reporting on any associated statistical data, such as deprivation indices.  For mobile libraries, this is likely to be the co-ordinates of the particular stop.
- The location of the library that owns the item.  All items have a home location which can be used in the same way as above.
- The home library of the patron.  A patron will be tied to a particular registration library which can be used in the same way as above.
- The home location of the patron.  The accuracy of this data will likely depend upon the accuracy of the patron address.  Although some systems will have accurate Ordnance Survey validated addresses, with exact co-ordinates, in lots of cases this is likely to be only accurate to postcode.

Therefore for every Issue there are 4 associated geographical locations.  The library locations will often be the **same** location, but can also be distinct, especially in a wide ranging consortium where items move between libraries, and where patrons have a wide variety of libraries to use.

With an appropriately structured reporting database, constructing reports that make use of extended geographical data should be fairly straightforward.  Someone asking for a count of issues for each library should be no different from them asking for issues for each of the output areas in their authority, or postcode districts.  Or a summary of issues by patron address deprivation decile.  It would be powerful to make this part of our day-to-day reporting capability, rather than an exercise that is undertaken every now and then.
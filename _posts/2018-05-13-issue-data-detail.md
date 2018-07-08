---
title: Level of detail for issue data
description: how much detail is useful?
image: 
published: true
---

When working on library data reports we often have to decide how much detail we should provide. Primarily this is guided by whatever people have asked for. But we also try to create repeatable data extracts that could cover requirements that may arise in the future.

It's also useful to have extracts that cover multiple uses. One library service may report on counts of issues per library for each month. Another may have a need to report across all libraries per month, but also want user profile as a level of detail in the data. Both can probably be served by a single data extract, and tailored as required by the report user.

So the choice is between level of detail and *'manageability'*. Having extra data is not a problem until it becomes so large that it's difficult to transfer or process. For issue data, we wouldn't assume people could cope with a row for each item issue, as it would be hundreds of thousands of rows. We often work at quite high levels of aggregation such 'per month'. Rarely as detailed as per day.

But it's those details that provide the most interesting ways of looking at data. And there are ways we can get at extra detail without having to make huge extracts. Reporting per *'day of the week'* rather than per *'date'* would mean we could see differences between different days of the week. Further than this, we can look at hour of the day to start to analyse when libraries are most active (at least in terms of borrowing).

So let's look at issues per hour across all libraries in LibrariesWest. It'd be nice to look at two things:

- The total number of issues for each hour of the day. That's fairly simple, just counting up those that have happened between 9:00 and 10:00, 10:00 and 11:00, etc.
- The average number of issues for each hour of the day. That's more difficult. The above report will tell us in which hour of the day items were most issued, but that will probably just be the hour that libraries are most commonly open. It would be nice to have something that gave an indication of the busiest hour, not the most common. For this we need to calculate an average using the number of libraries actually open during that hour.

A problem is that individual days may have very different profiles. Weekends for example will likely see very different user patterns to Weekdays. And there will be a significant difference between Saturday and Sunday as well.

So, let's also separate by day of the week. With the two reports we can compare the trend of issues throughout each day of the week, and see if the total issues in each hour follows the same pattern as the average number of issues. We'll do all that for all LibrariesWest libraries with a years worth of data.

#### Report 1. Total number of issues by day of week at hourly intervals

<iframe width="800" height="450" src="//embed.chartblocks.com/1.0/?c=5af821881ea0f6e438df6ced&t=a0f6c46f6c19b88" frameBorder="0"></iframe>

We have a few clear observations here. Most days have a pattern of a morning peak (11am), with a significant dip around lunchtime, and then another (always smaller) afternoon peak. Sunday is significantly quiet, although we know that very few libraries are open on Sunday.

#### Report 2. Average number of issues by day of week at hourly intervals

<iframe width="800" height="450" src="//embed.chartblocks.com/1.0/?c=5af826671ea0f6713adf6ced&t=9ca727b584ab2d6" frameBorder="0"></iframe>

We have a fairly similar profile using the average values. Sunday is still the day with fewest issues, though much closer to the others now, as it takes into account the fact only a few libraries are open. Thursday and Friday have slightly shifted. Total values made it look like Friday was busier, but the average values show Thursday slightly ahead. Perhaps more libraries are closed on Thursday, but it's actually a slightly more desirable day.

#### Data

- [Report 1 data: issue per day per hour](https://raw.githubusercontent.com/LibrariesWest/librarieswest.github.io/master/data/usage_loansbydayandhour.csv)
- [Report 2 data: issues per day per hour averages](https://raw.githubusercontent.com/LibrariesWest/librarieswest.github.io/master/data/usage_loansbydayandhouraverage.csv)

Data is released under the [Open Government Licence](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).
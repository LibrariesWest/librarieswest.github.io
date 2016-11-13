---
layout: default
title: Home
---

<div class="page">
    <h1 class="page-title">Posts</h1>
	<ul class="posts">
	{% for post in site.posts %}
		<li class="post">]
			<span class="post-date">{{ post.date | date_to_string }}</span>&nbsp;<a href="{{ site.baseurl }}/{{ post.url }}">{{ post.title }}</a>
		</li>
	{% endfor %}
	</ul>
</div>
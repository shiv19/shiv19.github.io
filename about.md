---
layout: page
title: About
permalink: /about/
published: true
---
<style>
.about-timeline {
	margin: 2rem 0;
	padding-left: 0;
	list-style: none;
	position: relative;
	color: var(--color-text-primary);
}
.about-timeline::before {
	content: '';
	position: absolute;
	left: 12px;
	top: 0;
	bottom: 0;
	width: 2px;
	background: var(--color-border, #e0e0e0);
}
.about-timeline li {
	margin: 0 0 1.75rem 0;
	padding-left: 2.5rem;
	position: relative;
}

.about-timeline li::before {
	content: '';
	position: absolute;
	left: 5px;
	top: 6px;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 3px solid var(--color-accent, #1a73e8);
	background: var(--color-bg, #fff);
}

.testimonial-card {
	border-radius: 14px;
	border: 1px solid var(--color-border, #f0f0f0);
	padding: 1.5rem;
	margin: 1.5rem 0;
	background: var(--color-code-bg, #faf8ff);
	color: var(--color-text-primary);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}
.testimonial-card blockquote {
	margin: 0;
	font-style: italic;
	color: var(--color-text-primary);
}
.testimonial-card cite {
	display: block;
	margin-top: 1rem;
	font-weight: 600;
	color: var(--color-text-muted, #555);
}
</style>

{% assign birthdate = '1995-08-19' | date: '%s' %}
{% assign now_ts = 'now' | date: '%s' %}
{% assign age = now_ts | minus: birthdate | divided_by: 31556926 | floor %}
{% assign son_birthdate = '2024-12-30' | date: '%s' %}
{% assign son_age_seconds = now_ts | minus: son_birthdate %}
{% if son_age_seconds < 0 %}
	{% assign son_age_seconds = 0 %}
{% endif %}
{% assign son_age_months = son_age_seconds | divided_by: 2629746 | floor %}
{% assign son_age_years = son_age_months | divided_by: 12 | floor %}
{% assign son_age_remaining_months = son_age_months | modulo: 12 %}

Kia ora! I'm Shiva Prasad, a {{ age }}-year-old New Zealand-based mobile technologist who loves turning ambitious product ideas into reliable apps. I grew up in Karnataka, India, and now call Auckland home. Over the past decade I've led cross-platform teams, shipped consumer apps that scale globally, and obsessed over the details that make mobile experiences fast, accessible, and delightful.

### Quick Facts

- **Where you'll find me:** Auckland, New Zealand (after a childhood in Karnataka, India)
- **What keeps the lights on:** NativeScript, Angular, Node.js, and the odd backend when no one else volunteers
- **How long I've been at it:** 8+ years of shipping mobile products for iOS and Android
- **Favorite job title:** Dad to a December 2024 baby who is currently {% if son_age_years > 0 %}{{ son_age_years }} year{% if son_age_years > 1 %}s{% endif %}{% if son_age_remaining_months > 0 %} and {{ son_age_remaining_months }} month{% if son_age_remaining_months > 1 %}s{% endif %}{% endif %}{% else %}{{ son_age_months }} month{% if son_age_months > 1 %}s{% endif %}{% endif %} old

## What I Do

- Build and lead cross-functional teams delivering NativeScript, Angular, and Node.js solutions for iOS and Android
- Architect end-to-end product experiences, from ideation and UX prototyping to deployment and performance tuning
- Coach teams on automated testing, CI/CD, and pragmatic mobile performance techniques

## Career Journey

<ul class="about-timeline">
	<li>
		<strong>Technical Lead · Simpro Group (2024—Present)</strong><br>
		Guiding a talented crew of mobile engineers as we evolve the Simpro Mobile app. Recent highlights include a new Task Management system, richer asset workflows, Stripe-powered payments, and an attachments refresh that boosted technician productivity.
	</li>
	<li>
		<strong>Senior Software Engineer · Bevie / Grainfather (2019—2024)</strong><br>
		Rebuilt the Grainfather brewing companion from the ground up, rolling out guided brew sessions, recipe intelligence, and lab-grade calculators while introducing automated testing and AI-assisted tooling.
	</li>
	<li>
		<strong>Partner · <a href="https://nstudio.io">nStudio</a> (2018—Present)</strong><br>
		Work with founders to ship apps like Portable North Pole, TriviaSpar, Sweet.io, and Blackout Lighting Console—often parachuting in to unblock UX or performance puzzles.
	</li>
	<li>
		<strong>Earlier Chapters</strong><br>
		Led AnyGo at Bfit Technologies, crafted ride-matching intelligence at Jyopal Technologies, and prototyped immersive VR safety training during a Wipro internship. Graduated from Acharya Institute of Technology as the Computer Science department's best outgoing student.
	</li>
</ul>

## Community & Recognition

- Progress NativeScript Developer Expert (India's first, 2018)
- Regular conference speaker across NativeScript Dev Days, JS Mobile Conf, DevConf India, and more
- Open-source contributor behind @nativescript/ui-charts, nativescript-imagecropper, and other plugins
- Marathoner and volunteer fundraiser for New Zealand mental health and cancer charities

## Life Beyond Shipping Apps

Family life keeps me grounded: I'm married to an incredible Vietnamese partner, and together we're raising our son{% if son_age_years > 0 %} ({{ son_age_years }}y{% if son_age_remaining_months > 0 %} {{ son_age_remaining_months }}m{% endif %}){% else %} ({{ son_age_months }} months){% endif %}, born in December 2024. When I manage to steal solo time, you'll find me chasing miles on Auckland's coastal runways, tinkering with AI workflows, or geeking out over the latest VR headset. Evenings are for anime marathons—My Hero Academia is the current binge, joining past favorites like Death Note, Naruto, Frieren, Re:Zero, and Shangri-La Frontier. Weekends usually involve e-bike rides, hikoi around Aotearoa's trails, or deep dives into gadgets that make family life a little more fun.

If we ever meet in person, there's a decent chance I'll show up straight from a run, ask what AI tools you're experimenting with, compare notes on VR headsets, and recommend at least one anime arc that made me think differently about storytelling.

## Work With Me

Need a prototype, a performance intervention, or a second set of eyes on a tricky NativeScript issue? I offer consultation and remote debugging for teams worldwide.

[sp@shiv19.com](mailto:sp@shiv19.com)

Curious about the full career timeline? Let's connect on [LinkedIn](https://www.linkedin.com/in/multishiv19/).

## Testimonials

<div class="testimonial-card">
	<blockquote>
		“ It was great working with Shiva. He did some Nativescript consultation for me and he solved every single one of my doubts/problems. He really knows what he’s talking about and he expresses it with the right words. I will happily work with him again! ”
	</blockquote>
	<cite>— Miguel Cabral, Co-founder Pequeño Cuervo</cite>
</div>

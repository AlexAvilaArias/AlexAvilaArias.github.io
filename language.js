// Spanish is the source language. Keep the original markup and translate only
// text nodes and text attributes, so links, animations and form state survive.
(() => {
  'use strict';

  const translations = Object.freeze({
    'Portafolio de Alexander Avila: diseño gráfico, edición de video, social media, diseño web y cobertura de eventos.': 'Alexander Avila’s portfolio: graphic design, video editing, social media, web design and event coverage.',
    'Diseño gráfico y contenido digital para marcas, instituciones y eventos.': 'Graphic design and digital content for brands, institutions and events.',
    'alexander avila — diseñador gráfico y creador de contenido digital': 'alexander avila — graphic designer and digital content creator',
    'Saltar al contenido': 'Skip to content',
    'alexander avila, inicio': 'alexander avila, home',
    'menú': 'menu',
    'Abrir menú': 'Open menu',
    'Cerrar menú': 'Close menu',
    'Navegación principal': 'Main navigation',
    'Áreas de trabajo': 'Areas of expertise',
    'Proyecto IPA': 'IPA project',
    'Sectores': 'Industries',
    'Sobre mí': 'About me',
    'Contacto': 'Contact',
    'Volver a ver la introducción': 'Replay the introduction',
    'Diseño gráfico · contenido digital · eventos': 'Graphic design · digital content · events',
    'Diseño, edición, social media, web y cobertura de eventos.': 'Design, video editing, social media, web and event coverage.',
    'Explorar proyecto IPA': 'Explore the IPA project',
    'Abrir caso destacado del XX Congreso IPA': 'Open the featured case study of the 20th IPA Congress',
    'PROYECTO DESTACADO': 'FEATURED PROJECT',
    'abrir ↗': 'open ↗',
    'Diseño gráfico': 'Graphic design',
    'Edición de video': 'Video editing',
    'Diseño y actualización web': 'Web design and updates',
    'Cobertura de eventos': 'Event coverage',
    'Cinco áreas de trabajo': 'Five areas of expertise',
    'proyectos de diseño, edición, contenido, web y eventos.': 'projects in design, editing, content, web and events.',
    'profesionales': 'Professional skills',
    'Cobertura de eventos presenciales': 'On-site event coverage',
    'Dirección visual, piezas para redes, brochures, programas, presentaciones, credenciales, certificados y más.': 'Visual direction, social media graphics, brochures, programs, presentations, badges, certificates and more.',
    'Identidad': 'Identity',
    'Digital + impreso': 'Digital + print',
    'Selección diversa de piezas gráficas': 'A selection of graphic design work',
    'Portada del XX Congreso IPA': 'Cover of the 20th IPA Congress',
    'Promoción de inversión del congreso': 'Congress registration pricing graphic',
    'Portada del programa académico': 'Academic program cover',
    'Presentación de ponente': 'Speaker introduction',
    'Portada de la agenda turística de Cusco': 'Cusco travel itinerary cover',
    'Promoción de últimas vacantes': 'Last places available promotional graphic',
    'Gráfica de apertura para pantalla': 'Opening graphic for event screens',
    'Credencial para asistentes': 'Attendee badge',
    'Programación académica del congreso': 'Congress academic program',
    'Tutoriales, entrevistas, eventos y piezas cortas para redes: selección, montaje, gráficos, audio y adaptación por canal.': 'Tutorials, interviews, events and short social videos: footage selection, editing, graphics, audio and adaptations for each platform.',
    'Tutoriales': 'Tutorials',
    'Entrevistas': 'Interviews',
    'Reels y resúmenes': 'Reels and highlights',
    'Ver trabajo con Beauty TV y Alfaparf (edición y grabación)': 'View work with Beauty TV and Alfaparf (editing and filming)',
    'XX Congreso IPA · edición de una jornada': '20th IPA Congress · day highlights edit',
    'Planificación, diseño, adaptación, copy, publicación y gestión de comunidad para eventos institucionaless.': 'Planning, design, adaptations, copywriting, publishing and community management for institutional events.',
    'Contenido editorial': 'Editorial content',
    'Copys': 'Copywriting',
    'Publicación': 'Publishing',
    'Presentación de ponente para redes': 'Speaker introduction for social media',
    'Presentación': 'Introduction',
    'Reseña de ponente para redes': 'Speaker profile for social media',
    'Reseña': 'Profile',
    'Diseño de páginas, actualización continua, carga de eventos y mantenimiento web.': 'Page design, ongoing content updates, event listings and website maintenance.',
    'Contenido web': 'Web content',
    'Página de inicio actual del Instituto Peruano de Arbitraje': 'Current homepage of Instituto Peruano de Arbitraje',
    'Página de inicio de Carlos Soto y Asociados': 'Homepage of Carlos Soto y Asociados',
    'Cobertura fotográfica y audiovisual, coordinación de equipo, selección y edición para publicación durante el evento o entrega posterior.': 'Photo and video coverage, team coordination, selection and editing for publication during the event or delivery afterwards.',
    'Foto + video': 'Photo + video',
    'Coordinación': 'Coordination',
    'Edición y entrega': 'Editing and delivery',
    'Sala principal del XX Congreso IPA': 'Main room of the 20th IPA Congress',
    'Encuentro entre asistentes del congreso': 'Congress attendees meeting',
    'Ponencia durante el congreso': 'Talk during the congress',
    'Proyecto destacado': 'Featured project',
    'IPA · 20.º aniversario': 'IPA · 20th anniversary',
    'Instituto Peruano de Arbitraje · Derecho y eventos': 'Instituto Peruano de Arbitraje · Law and events',
    'UN CONGRESO': 'ONE CONGRESS',
    'DOS SALAS.': 'TWO ROOMS.',
    'El XX Congreso Internacional de Arbitraje reunió 91 ponentes, programación paralela, contenido digital, material impreso, web y cobertura audiovisual en una edición especial entre Lima y Cusco.': 'The 20th International Arbitration Congress brought together 91 speakers, parallel sessions, digital content, print materials, web content and audiovisual coverage for a special edition in Lima and Cusco.',
    'Explorar el proyecto completo': 'Explore the full project',
    'Selección visual del proyecto IPA': 'Visual highlights from the IPA project',
    'Portada cuadrada del XX Congreso IPA': 'Square cover of the 20th IPA Congress',
    'Portada principal del XX Congreso IPA': 'Main cover of the 20th IPA Congress',
    'Una de las dos salas simultáneas': 'One of the two rooms running in parallel',
    'Pieza promocional del congreso': 'Congress promotional graphic',
    'Agenda turística de Cusco': 'Cusco travel itinerary',
    'Imagen anterior': 'Previous image',
    'Imagen siguiente': 'Next image',
    'arrastra · rueda · explora': 'drag · scroll · explore',
    'Datos del caso': 'Case study facts',
    'ponentes': 'speakers',
    'salas simultáneas': 'parallel rooms',
    'paneles': 'panels',
    '20.º': '20th',
    'aniversario': 'anniversary',
    'He trabajado con': 'I have worked with',
    'Rubros y empresas con las que he trabajado': 'Industries and companies I have worked with',
    'Identidad visual de Latin American International Arbitration': 'Visual identity of Latin American International Arbitration',
    'Derecho y eventos': 'Law and events',
    'Información especializada, presencia institucional y producción de congresos.': 'Specialist information, institutional communications and congress production.',
    'Marcas del sector derecho y eventos': 'Brands in law and events',
    'Video producido para Beauty TV en colaboración con Alfaparf': 'Video produced for Beauty TV in collaboration with Alfaparf',
    'Belleza y audiovisual': 'Beauty and audiovisual',
    'Tutoriales, transmisiones y edición de contenido audiovisual.': 'Tutorials, live streams and audiovisual content editing.',
    'Marcas del sector belleza y audiovisual': 'Brands in beauty and audiovisual production',
    'Ver video': 'Watch video',
    'Producción audiovisual realizada para la Universidad Tecnológica del Perú': 'Audiovisual production for Universidad Tecnológica del Perú',
    'Educación': 'Education',
    'Contenido audiovisual y piezas de difusión para el entorno universitario.': 'Audiovisual content and promotional materials for higher education.',
    'Ver trabajo': 'View work',
    'Mini reto': 'Mini challenge',
    '4 piezas reales. ¿Para qué las usarías?': '4 real designs. What would you use them for?',
    'Pieza 1 / 4': 'Design 1 / 4',
    'Pieza {number} / {total}': 'Design {number} / {total}',
    'Piezas resueltas': 'Designs identified',
    'Pieza gráfica del congreso IPA': 'Graphic from the IPA Congress',
    'Elige el uso de esta pieza': 'Choose what this design is used for',
    'Siguiente pieza': 'Next design',
    'Ver resultado': 'View results',
    'aciertos al primer intento': 'correct answers on the first try',
    'Completaste el recorrido por diseño, redes, video y web.': 'You have explored design, social media, video and web.',
    'Otra ronda': 'Play again',
    'Ver las piezas en su proyecto ↗': 'See the designs in their project ↗',
    'Activa JavaScript para jugar con las piezas del portafolio.': 'Enable JavaScript to play with the portfolio designs.',
    'Trabajo entre diseño gráfico, contenido digital, edición, web y eventos.': 'I work across graphic design, digital content, video editing, web and events.',
    'Suite Adobe': 'Adobe suite',
    'Diseño Web': 'Web Design',
    'Empecemos por una idea': 'Let’s start with an idea',
    'Cuéntame qué necesitas mover.': 'Tell me what you have in mind.',
    'Diseño, contenido, web o cobertura de un evento. Puedes escribirme aquí o conversar por LinkedIn.': 'Design, content, web or event coverage. Send me a message here or get in touch on LinkedIn.',
    'Nuevo proyecto desde el portafolio de Alexander Avila': 'New project from Alexander Avila’s portfolio',
    'Nombre': 'Name',
    '¿Cómo te llamas?': 'What’s your name?',
    'Correo': 'Email',
    'tu@correo.com': 'you@example.com',
    '¿Qué necesitas?': 'What do you need?',
    'Selecciona una opción': 'Select an option',
    'Diseño o actualización web': 'Web design or updates',
    'Cobertura de evento': 'Event coverage',
    'Un proyecto que mezcla varias cosas': 'A project that brings several services together',
    'Cuéntame un poco': 'Tell me a little more',
    'Objetivo, fecha y entregables si ya los tienes.': 'Your goal, timeline and deliverables, if you already know them.',
    'Enviar mensaje': 'Send message',
    'Formulario protegido contra envíos automatizados.': 'This form is protected against automated submissions.',
    'diseño gráfico': 'graphic design',
    'diseño web': 'web design',
    'redes sociales': 'social media',
    'Diseñador gráfico y creador de contenido digital.': 'Graphic designer and digital content creator.',
    'Navegación secundaria': 'Secondary navigation',
    'Formulario de contacto ↗': 'Contact form ↗',
    'Lima, Perú': 'Lima, Peru',
    'PROYECTO IPA · XX CONGRESO': 'IPA PROJECT · 20TH CONGRESS',
    'Navegación del portafolio': 'Portfolio navigation',
    'Cerrar el caso': 'Close the case study',
    'abriendo caso': 'opening case study',
    'PROYECTO IPA — XX Congreso Internacional de Arbitraje': 'IPA PROJECT — 20th International Arbitration Congress',
    'Vista ampliada': 'Enlarged image',
    'Cerrar vista ampliada': 'Close enlarged image',
    'Cerrar ×': 'Close ×',
    'Abrir vista ampliada.': 'Open enlarged image.',
    'Caso de portafolio: identidad, contenido, web y cobertura del XX Congreso Internacional de Arbitraje IPA.': 'Portfolio case study: identity, content, web and event coverage for the 20th IPA International Arbitration Congress.',
    'XX Congreso IPA — caso de alexander avila': '20th IPA Congress — case study by alexander avila',
    '91 ponentes, 18 paneles y dos salas simultáneas para la edición del 20.º aniversario.': '91 speakers, 18 panels and two parallel rooms for the 20th anniversary edition.',
    'Capacidades': 'Expertise',
    'Cerrar el caso y volver al portafolio': 'Close the case study and return to the portfolio',
    'Caso destacado': 'Featured case study',
    'Derecho · diseño · contenido · web · eventos': 'Law · design · content · web · events',
    'XX Congreso Internacional de Arbitraje IPA': '20th IPA International Arbitration Congress',
    'Diseño, contenido y cobertura para una edición de aniversario con dos salas simultáneas en Lima y una agenda turística en Cusco.': 'Design, content and coverage for an anniversary edition with two parallel rooms in Lima and a travel itinerary in Cusco.',
    'Portada del XX Congreso Internacional de Arbitraje IPA con José María Alonso Puig': 'Cover of the 20th IPA International Arbitration Congress featuring José María Alonso Puig',
    'Portada principal · XX aniversario': 'Main cover · 20th anniversary',
    'paneles académicos': 'academic panels',
    'La edición rindió homenaje a': 'This edition honored',
    ', presidente de CIIAM y referente con más de tres décadas de trayectoria en arbitraje internacional. Ambas salas operaron en paralelo y con aforo completo.': ', president of CIIAM and a leading figure with more than three decades of experience in international arbitration. Both rooms ran in parallel at full capacity.',
    'Dirección visual': 'Visual direction',
    'Contenido digital': 'Digital content',
    'Material imprimible': 'Print materials',
    'Cobertura': 'Coverage',
    'Archivo operativo': 'Project archive',
    '· 6,492 archivos · 246 carpetas · 165.12 GB': '· 6,492 files · 246 folders · 165.12 GB',
    'Recorrer el proceso': 'Explore the process',
    'Caso IPA · XX Congreso': 'IPA case study · 20th Congress',
    'Secciones del caso': 'Case study sections',
    '01 · Identidad': '01 · Identity',
    '02 · Ponentes': '02 · Speakers',
    '03 · Dos salas': '03 · Two rooms',
    '04 · Materiales': '04 · Materials',
    '06 · Cobertura': '06 · Coverage',
    'Índice del caso': 'Case study index',
    '91 ponentes': '91 speakers',
    'Dos salas': 'Two rooms',
    'Materiales': 'Materials',
    '01 · Identidad de aniversario': '01 · Anniversary identity',
    'Una edición conmemorativa': 'An anniversary edition',
    'La portada reunió la edición número veinte, las sedes de Lima y Cusco y el homenaje a José María Alonso Puig.': 'The cover brought together the 20th edition, the locations in Lima and Cusco, and the tribute to José María Alonso Puig.',
    'Contenido': 'Content',
    'Diseño': 'Design',
    'Adaptación cuadrada del XX Congreso IPA': 'Square adaptation of the 20th IPA Congress cover',
    'Portada cuadrada': 'Square cover',
    'Portada principal': 'Main cover',
    'Homenaje a José María Alonso Puig': 'Tribute to José María Alonso Puig',
    'Homenaje': 'Tribute',
    'Pieza promocional de inversión': 'Registration pricing promotional graphic',
    'Promoción': 'Promotion',
    'Programa académico': 'Academic program',
    '02 · Serie de contenidos': '02 · Content series',
    'Dos piezas para presentar a cada ponente.': 'Two designs to introduce each speaker.',
    'Una gráfica introduce al especialista y la otra resume su trayectoria.': 'One graphic introduces the speaker; the other highlights their background.',
    'ponentes confirmados.': 'confirmed speakers.',
    'La galería avanza sola; arrastra para explorar y haz clic para ampliar.': 'The gallery scrolls automatically. Drag to explore and click to enlarge.',
    'Galería de presentaciones y reseñas de ponentes': 'Gallery of speaker introductions and profiles',
    'Retroceder en la galería': 'Scroll back through the gallery',
    '144 piezas seleccionadas · presentación y reseña': '144 selected designs · introductions and profiles',
    'Avanzar en la galería': 'Scroll forward through the gallery',
    '03 · Programación paralela': '03 · Parallel sessions',
    'Dos salas simultáneas.': 'Two rooms running in parallel.',
    'Las piezas se integraron a presentaciones y pantallas para orientar la programación.': 'The graphics were incorporated into presentations and event screens to guide attendees through the program.',
    'Desliza las imágenes →': 'Swipe through the images →',
    'Gráfica de inauguración': 'Opening ceremony graphic',
    'Apertura': 'Opening',
    'Gráfica de panel académico': 'Academic panel graphic',
    'Panel académico': 'Academic panel',
    'Programación académica de la sala 1': 'Academic program for room 1',
    'Panel · sala 1': 'Panel · room 1',
    'Programación académica de la sala 2': 'Academic program for room 2',
    'Panel · sala 2': 'Panel · room 2',
    'Gráfica de clausura': 'Closing ceremony graphic',
    'Clausura': 'Closing',
    'Vista general de una de las dos salas del congreso': 'Overview of one of the two congress rooms',
    'Sesión presencial': 'In-person session',
    'Asistentes durante la programación del congreso': 'Attendees during the congress sessions',
    'Programación en sala': 'Room sessions',
    '04 · De la pantalla al evento': '04 · From screen to event',
    'Materiales que entraron en uso.': 'Materials put into use.',
    'Credenciales, tarecos, paneles, certificados, presentaciones y gráficas proyectadas. También diseñé el backing según los requerimientos del cliente.': 'Badges, table nameplates, panels, certificates, presentations and screen graphics. I also designed the event backdrop to the client’s specifications.',
    'Credenciales': 'Badges',
    'Tarecos': 'Table nameplates',
    'Paneles': 'Panels',
    'Backing': 'Backdrop',
    'Certificados': 'Certificates',
    'Credencial · asistentes': 'Badge · attendees',
    'Credencial para ponentes': 'Speaker badge',
    'Credencial · ponentes': 'Badge · speakers',
    'Tareco personalizado': 'Personalized table nameplate',
    'Tareco': 'Table nameplate',
    'Certificado de participación': 'Participation certificate',
    'Certificado': 'Certificate',
    'Diseño final del backing': 'Final event backdrop design',
    'Backing · diseño': 'Backdrop · design',
    'Backing instalado durante el evento': 'Backdrop installed at the event',
    'Backing · aplicación real': 'Backdrop · in use',
    '05 · ipa.pe y contenido digital': '05 · ipa.pe and digital content',
    'El evento también debía mantenerse actualizado en la web.': 'The event website needed to stay up to date, too.',
    'Diseño y actualización de páginas, banners e información en': 'Designing and updating pages, banners and information on',
    ', además de los cambios que debían reflejarse en contenido digital e imprimible cuando se ajustaban fechas, participantes o programación.': ', while keeping digital content and print materials consistent whenever dates, participants or schedules changed.',
    'Visitar ipa.pe': 'Visit ipa.pe',
    'ipa.pe · portada': 'ipa.pe · homepage',
    'Portada actual del sitio del Instituto Peruano de Arbitraje': 'Current homepage of the Instituto Peruano de Arbitraje website',
    'ipa.pe · XX Congreso': 'ipa.pe · 20th Congress',
    'Página del XX Congreso Internacional de Arbitraje IPA': 'Webpage of the 20th IPA International Arbitration Congress',
    'Sección de sponsors del sitio IPA': 'Sponsors section of the IPA website',
    'ipa.pe · contacto': 'ipa.pe · contact',
    'Bloque de contacto del sitio IPA': 'Contact section of the IPA website',
    '06 · Dos salas': '06 · Two rooms',
    'Cobertura del evento.': 'Event coverage.',
    'Cubrí directamente y coordiné el trabajo general con el equipo. La labor incluyó registro, selección, edición y publicación durante las jornadas, además de material preparado para entrega posterior.': 'I covered the event myself and coordinated the team’s overall work. This included capturing, selecting, editing and publishing content throughout the event, as well as preparing materials for later delivery.',
    'Dirección de equipo': 'Team direction',
    'Foto': 'Photo',
    'Edición': 'Editing',
    'Resumen audiovisual · jornada 1': 'Video highlights · day 1',
    'Networking durante el congreso': 'Networking during the congress',
    'Asistentes en una de las salas': 'Attendees in one of the rooms',
    'Asistentes': 'Attendees',
    'Ponencia': 'Talk',
    'Encuentro entre participantes': 'Participants meeting',
    'Participantes': 'Participants',
    'Actividad social del congreso': 'Congress social activity',
    'Actividad social': 'Social activity',
    'Fotografía grupal en sala': 'Group photo in the congress room',
    'Foto grupal': 'Group photo',
    'Panel en desarrollo': 'Panel in progress',
    'Programación': 'Program',
    '07 · Actividades sociales': '07 · Social activities',
    'La experiencia continuó en Lima.': 'The experience continued in Lima.',
    'Las piezas organizaron horarios, sedes y patrocinadores de las actividades sociales, manteniendo la identidad del congreso fuera de las salas académicas.': 'The designs organized schedules, venues and sponsors for the social activities, extending the congress identity beyond the academic sessions.',
    'Portada de actividades sociales en Lima': 'Cover of the social activities in Lima',
    'Actividades sociales': 'Social activities',
    'Almuerzo del 29 de abril': 'Lunch on April 29',
    'Almuerzo · 29 de abril': 'Lunch · April 29',
    'Cóctel del 29 de abril': 'Cocktail reception on April 29',
    'Cóctel · 29 de abril': 'Cocktail reception · April 29',
    'Almuerzo del 30 de abril': 'Lunch on April 30',
    'Almuerzo · 30 de abril': 'Lunch · April 30',
    'Cóctel del 30 de abril': 'Cocktail reception on April 30',
    'Cóctel · 30 de abril': 'Cocktail reception · April 30',
    '08 · Agenda turística': '08 · Travel itinerary',
    'La identidad llegó hasta Cusco.': 'The identity reached Cusco.',
    'El brochure de agenda turística organizó tres días de recorrido con una atmósfera cultural y cálida, conectada visualmente con el congreso sin confundirla con las actividades sociales realizadas en Lima.': 'The travel brochure organized three days of sightseeing with a warm, cultural feel. Its visual identity connected it to the congress while giving it a distinct character from the social activities in Lima.',
    'páginas seleccionadas: portada e itinerario completo': 'selected pages: cover and complete itinerary',
    'Portada de la agenda turística en Cusco': 'Cover of the Cusco travel itinerary',
    'Portada': 'Cover',
    'Página interior del primer día en Cusco': 'Interior page for the first day in Cusco',
    'Día 1 · Cusco': 'Day 1 · Cusco',
    'Página interior del segundo día en Cusco': 'Interior page for the second day in Cusco',
    'Día 2 · Machu Picchu': 'Day 2 · Machu Picchu',
    'Página interior del tercer día en Cusco': 'Interior page for the third day in Cusco',
    'Día 3 · Maras y Moray': 'Day 3 · Maras and Moray',
    '· Comencemos un proyecto': '· Let’s start a project',
    '¿Qué hacemos funcionar en tu próximo proyecto?': 'What can we bring to life in your next project?',
    'Abrir formulario': 'Open contact form',
    'Diseño gráfico y contenido digital.': 'Graphic design and digital content.',
    'fin del': 'end of',
    'caso': 'case study',
    'hablemos ✦': 'let’s talk ✦',
    'Cerrar caso ×': 'Close case study ×',
    'Mensaje enviado — alexander avila': 'Message sent — alexander avila',
    'Volver al portafolio': 'Back to the portfolio',
    'Mensaje enviado': 'Message sent',
    'Gracias por escribir.': 'Thanks for reaching out.',
    'Tu mensaje ya va camino a mi correo. Volveré contigo tan pronto como pueda.': 'Your message is on its way to my inbox. I’ll get back to you as soon as I can.',
    'Pieza gráfica del XX Congreso IPA': 'Graphic from the 20th IPA Congress',
    'Identificar a los asistentes': 'Identify attendees',
    'Presentar el sitio web': 'Introduce the website',
    'Anunciar una ponencia': 'Announce a talk',
    'Pista: acompaña a cada persona durante el congreso.': 'Hint: each person wears this during the congress.',
    'Una credencial del XX Congreso IPA: la identidad del evento también se lleva puesta.': 'A badge for the 20th IPA Congress: the event identity can be worn, too.',
    'Gráfica con un especialista del congreso IPA': 'Graphic featuring a speaker from the IPA Congress',
    'Orientar hacia una sala': 'Point the way to a room',
    'Presentar a un ponente': 'Introduce a speaker',
    'Acreditar la asistencia': 'Certify attendance',
    'Pista: esta pieza se publicaba junto con una reseña.': 'Hint: this design was published alongside a speaker profile.',
    'Una de las presentaciones de los 91 ponentes: diseño y contenido para redes sociales.': 'One of the introductions for the 91 speakers: design and content for social media.',
    'Fotograma del video del XX Congreso IPA': 'Still from the 20th IPA Congress video',
    'Mostrar una tarifa': 'Show a registration fee',
    'Ubicar a los participantes': 'Direct participants to a location',
    'Resumir una jornada en video': 'Summarize a day on video',
    'Pista: une momentos del evento, movimiento y ritmo.': 'Hint: it combines event moments, motion and rhythm.',
    'El resumen de la primera jornada: selección de momentos, edición y ritmo audiovisual.': 'Highlights from the first day: selected moments, editing and audiovisual rhythm.',
    'Vista de un proyecto digital para Carlos Soto y Asociados': 'View of a digital project for Carlos Soto y Asociados',
    'Presentar el estudio en la web': 'Introduce the firm online',
    'Proyectar un panel académico': 'Display an academic panel on screen',
    'Diseñar una credencial': 'Design a badge',
    'Pista: aquí se puede navegar y conocer al estudio.': 'Hint: you can browse it to learn about the firm.',
    'Diseño web y actualización de contenidos para Carlos Soto y Asociados.': 'Web design and content updates for Carlos Soto y Asociados.',
    'Presentación de ponente {number}': 'Introduction of speaker {number}',
    'Reseña de ponente {number}': 'Profile of speaker {number}',
    '{number} · Presentación': '{number} · Introduction',
    '{number} · Reseña': '{number} · Profile',
    'Cerrar modo personal': 'Close personal mode',
    'Abrir modo personal': 'Open personal mode',
    'Mostrar capacidad del portafolio': 'Show portfolio expertise',
    'Abre una capacidad profesional en la sección interactiva del portafolio y la lleva a la vista.': 'Opens an area of expertise in the interactive portfolio section and scrolls it into view.',
    'Capacidad no válida.': 'Invalid area of expertise.',
    'Mostrar capítulo del caso IPA': 'Show IPA case study chapter',
    'Navega a un capítulo específico del caso del XX Congreso IPA y actualiza el indicador visible.': 'Navigates to a chapter of the 20th IPA Congress case study and updates the visible progress indicator.',
    'Capítulo no válido.': 'Invalid chapter.'
  });

  const storageKey = 'aa-portfolio-language';
  const supported = ['es', 'en'];
  const baseUrl = new URL('./', document.currentScript.src);
  const normalize = (value) => value.replace(/\s+/g, ' ').trim();
  const reverse = new Map(Object.entries(translations).map(([es, en]) => [en, es]));
  const sourceOf = (source) => {
    const normalized = normalize(source);
    return Object.hasOwn(translations, normalized) ? normalized : reverse.get(normalized) || normalized;
  };
  const textSources = new WeakMap();
  const attributeSources = new WeakMap();
  const validLanguage = (value) => supported.includes(value) ? value : null;
  const storedLanguage = () => {
    try { return validLanguage(localStorage.getItem(storageKey)); } catch (_) { return null; }
  };
  const browserLanguage = () => {
    for (const locale of navigator.languages || [navigator.language]) {
      const language = validLanguage(String(locale).toLowerCase().split(/[-_]/)[0]);
      if (language) return language;
    }
    return 'en';
  };
  const requestedLanguage = validLanguage(new URLSearchParams(location.search).get('lang'));
  let manualChoice = Boolean(requestedLanguage || storedLanguage());
  let language = requestedLanguage || storedLanguage() || browserLanguage();
  document.documentElement.lang = language;

  function t(source, values = {}) {
    const key = sourceOf(source);
    const translated = language === 'en' ? translations[key] || key : key;
    const result = translated.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
    // Preserve whitespace around inline links, emphasized names and arrow icons.
    return source.match(/^\s*/)[0] + result + source.match(/\s*$/)[0];
  }

  function text(target, source, values = {}) {
    if (!target) return;
    const binding = { source, values };
    if (target.nodeType === Node.TEXT_NODE) {
      textSources.set(target, binding);
      target.nodeValue = t(source, values);
    } else {
      target.textContent = t(source, values);
      if (target.firstChild) textSources.set(target.firstChild, binding);
    }
  }

  function attribute(target, name, source, values = {}) {
    if (!target) return;
    const bindings = attributeSources.get(target) || new Map();
    bindings.set(name, { source, values });
    attributeSources.set(target, bindings);
    target.setAttribute(name, t(source, values));
  }

  function clone(source) {
    const copy = source.cloneNode(true);
    const sources = document.createTreeWalker(source, NodeFilter.SHOW_ALL);
    const copies = document.createTreeWalker(copy, NodeFilter.SHOW_ALL);
    const copyBindings = (original, duplicate) => {
      if (textSources.has(original)) textSources.set(duplicate, textSources.get(original));
      if (attributeSources.has(original)) attributeSources.set(duplicate, new Map(attributeSources.get(original)));
    };
    copyBindings(source, copy);
    while (sources.nextNode() && copies.nextNode()) copyBindings(sources.currentNode, copies.currentNode);
    return copy;
  }

  function translate(root = document) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue.trim() && !node.parentElement?.closest('script, style, noscript, [data-language-switch]')
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const binding = textSources.get(node) || { source: node.nodeValue, values: {} };
      if (!Object.hasOwn(translations, sourceOf(binding.source))) continue;
      textSources.set(node, binding);
      node.nodeValue = t(binding.source, binding.values);
    }
    root.querySelectorAll('[alt], [aria-label], [placeholder], [title], [data-case-name], meta[name="description"], meta[property="og:title"], meta[property="og:description"], input[name="_subject"]').forEach((element) => {
      if (element.closest('[data-language-switch]')) return;
      const names = ['alt', 'aria-label', 'placeholder', 'title', 'data-case-name'];
      if (element.matches('meta')) names.push('content');
      if (element.matches('input[name="_subject"]')) names.push('value');
      names.forEach((name) => {
        if (!element.hasAttribute(name)) return;
        const bindings = attributeSources.get(element);
        const binding = bindings?.get(name) || { source: element.getAttribute(name), values: {} };
        if (Object.hasOwn(translations, sourceOf(binding.source))) attribute(element, name, binding.source, binding.values);
      });
    });
  }

  function updateLinks() {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      const url = new URL(href, location.href);
      if (url.origin !== baseUrl.origin || !url.pathname.startsWith(baseUrl.pathname)) return;
      if (!url.pathname.endsWith('.html') && !url.pathname.endsWith('/')) return;
      url.searchParams.set('lang', language);
      link.setAttribute('href', url.href);
    });
    const redirect = document.querySelector('[data-contact-form] input[name="_next"]');
    if (redirect) {
      const url = new URL('gracias/index.html', baseUrl);
      url.searchParams.set('lang', language);
      redirect.value = url.href;
      redirect.disabled = false;
    }
  }

  function updateControls() {
    document.querySelectorAll('[data-language-switch]').forEach((control) => {
      control.hidden = false;
      control.setAttribute('aria-label', language === 'es' ? 'Idioma del sitio' : 'Website language');
      control.querySelectorAll('[data-language]').forEach((button) => {
        const selected = button.dataset.language === language;
        button.setAttribute('aria-pressed', String(selected));
        button.setAttribute('aria-label', button.dataset.language === 'es' ? 'Ver en español' : 'View in English');
        button.title = button.dataset.language === 'es' ? 'Español' : 'English';
      });
    });
  }

  function setLanguage(nextLanguage, { persist = false, updateUrl = false, sync = true } = {}) {
    if (!validLanguage(nextLanguage)) return;
    const changed = language !== nextLanguage;
    language = nextLanguage;
    document.documentElement.lang = language;
    if (persist) {
      manualChoice = true;
      try { localStorage.setItem(storageKey, language); } catch (_) { /* The URL still carries the choice. */ }
    }
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      try { history.replaceState(history.state, '', url); } catch (_) { /* Translation also works on file previews. */ }
    }
    translate();
    updateControls();
    updateLinks();
    if (changed) window.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
    if (sync) {
      // Same-origin case windows also stay in sync when storage is disabled.
      try {
        if (window.parent !== window) window.parent.PortfolioLanguage?.setLanguage(language, { sync: false, updateUrl: true });
        document.querySelectorAll('[data-case-frame]').forEach((frame) => {
          frame.contentWindow?.PortfolioLanguage?.setLanguage(language, { sync: false, updateUrl: true });
        });
      } catch (_) { /* Ignore unrelated cross-origin frames. */ }
    }
  }

  window.PortfolioLanguage = { get current() { return language; }, t, text, attribute, clone, translate, setLanguage };

  function initialize() {
    // Keep submitted service values stable while translating their visible labels.
    document.querySelectorAll('[data-contact-form] option:not([value])').forEach((option) => {
      option.value = option.textContent;
    });
    setLanguage(language, { sync: false });
    document.querySelectorAll('[data-language-switch] [data-language]').forEach((button) => {
      button.addEventListener('click', () => setLanguage(button.dataset.language, { persist: true, updateUrl: true }));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
  window.addEventListener('languagechange', () => { if (!manualChoice) setLanguage(browserLanguage()); });
  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey) return;
    manualChoice = Boolean(validLanguage(event.newValue));
    setLanguage(validLanguage(event.newValue) || browserLanguage(), { updateUrl: true });
  });
})();

import JSZip from 'jszip';

export interface GeneratedFile {
  name: string;
  content: string;
  description: string;
}

export function getWordpressThemeFiles(): GeneratedFile[] {
  const styleCss = `/*
Theme Name: Residence ISNI
Theme URI: https://residence-isni.ma
Author: Studio Agadir
Author URI: https://residence-isni.ma
Description: Thème WordPress sur mesure inspiré de fr.desertsurfcamp.com pour l'appart-hôtel Résidence ISNI à Agadir (29 chambres). Comprend un calendrier de réservation en temps réel avec synchronisation Google Sheets et gestion des petits-déjeuners.
Version: 1.0.0
Requires at least: 6.0
Tested up to: 7.1.3
Requires PHP: 8.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: residence-isni
*/

:root {
  --color-sand: #f2e8df;
  --color-sand-light: #faf5f0;
  --color-surf-orange: #f05a2d;
  --color-surf-navy: #06306b;
  --color-surf-pink: #f29acb;
  --color-surf-teal: #1f6f78;
  --font-bebas: 'Bebas Neue', sans-serif;
  --font-marker: 'Permanent Marker', cursive;
  --font-archivo: 'Archivo', sans-serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-sand);
  color: var(--color-surf-navy);
  line-height: 1.6;
  overflow-x: hidden;
}

.ghost-title {
  font-family: var(--font-bebas);
  font-size: clamp(3.5rem, 12vw, 10rem);
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(6, 48, 107, 0.15);
  text-transform: uppercase;
  user-select: none;
}

.marker-highlight {
  font-family: var(--font-marker);
  color: var(--color-surf-orange);
}

.btn-primary {
  display: inline-block;
  background-color: var(--color-surf-orange);
  color: #ffffff;
  font-weight: 700;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: 9999px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.btn-primary:hover {
  background-color: #d44519;
  transform: translateY(-2px);
}

.card-panel {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(6, 48, 107, 0.06);
}
.isni-preloader { position:fixed;inset:0;z-index:99999;display:grid;place-items:center;overflow:hidden;background:#063b4c;color:#fff;transition:opacity .36s ease,visibility .36s ease; }
.isni-preloader.is-leaving { opacity:0;visibility:hidden; }
.isni-preloader-backdrop { position:absolute;inset:-4%;background-size:cover;background-position:center 54%;animation:isni-loader-scene 16s ease-in-out infinite alternate; }
.isni-preloader-content { position:relative;z-index:2;display:flex;align-items:center;flex-direction:column;padding:28px;text-align:center;text-shadow:0 2px 24px rgba(0,25,38,.45); }
.isni-preloader-mark { display:grid;place-items:center;width:58px;height:58px;margin-bottom:20px;border-radius:50%;background:#f2e8df;color:#063b4c;font-size:1.5rem;animation:isni-loader-float 2.8s ease-in-out infinite; }
.isni-preloader-kicker { margin:0 0 8px;color:#f6c89c;font-size:12px;font-weight:700;letter-spacing:.24em;text-transform:uppercase; }
.isni-preloader-title { margin:0;font-family:'Bebas Neue',sans-serif;font-size:clamp(3.2rem,10vw,7rem);line-height:.88;letter-spacing:.035em; }
.isni-preloader-caption { margin:15px 0 30px;color:rgba(255,255,255,.9); }
.isni-preloader-board { width:88px;height:15px;margin-bottom:35px;border:2px solid rgba(255,255,255,.9);border-radius:100%;background:linear-gradient(90deg,#f05a2d 0 20%,#f2e8df 20% 80%,#f05a2d 80%);animation:isni-loader-board 2.2s ease-in-out infinite; }
.isni-preloader-progress { width:min(180px,55vw);height:2px;overflow:hidden;background:rgba(255,255,255,.3); }
.isni-preloader-progress span { display:block;width:40%;height:100%;background:#f2e8df;animation:isni-loader-progress 1.05s cubic-bezier(.45,0,.35,1) forwards; }
.isni-preloader-waves { position:absolute;z-index:1;inset:auto 0 -1px;width:100%;height:clamp(150px,27vh,280px); }
.isni-wave-back { transform-box:fill-box;transform-origin:center;animation:isni-loader-wave-back 8s ease-in-out infinite alternate; }
.isni-wave-front { transform-box:fill-box;transform-origin:center;animation:isni-loader-wave-front 6.5s ease-in-out infinite alternate; }
@keyframes isni-loader-scene { to { transform:scale(1.08) translate3d(1%,-1%,0); } }
@keyframes isni-loader-float { 50% { transform:translateY(-5px) rotate(-4deg); } }
@keyframes isni-loader-board { 50% { transform:translate3d(20px,-8px,0) rotate(5deg); } }
@keyframes isni-loader-progress { from { transform:translateX(-115%); } to { transform:translateX(260%); } }
@keyframes isni-loader-wave-back { to { transform:translate3d(-2%,7px,0) scaleY(1.08); } }
@keyframes isni-loader-wave-front { to { transform:translate3d(2%,-8px,0) scaleY(.96); } }
@media (prefers-reduced-motion:reduce) { .isni-preloader,.isni-preloader * { animation-duration:.01ms!important;animation-iteration-count:1!important; } }
.isni-image-drift { overflow:hidden; isolation:isolate; }
.isni-image-drift img { animation:isni-image-swell 18s ease-in-out infinite alternate; transition:filter .5s ease,transform .7s ease; }
.isni-image-drift:hover img { filter:blur(1px) saturate(1.08); }
@keyframes isni-image-swell { from { transform:scale(1.04) translate3d(-.5%,0,0); } to { transform:scale(1.1) translate3d(.7%,-1%,0); } }
.isni-surf-menu:focus-within > div { display: block !important; }
@keyframes isni-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
body.page-template-page-surf-debutant main > section, body.page-template-page-surf-intermediaire main > section { animation: isni-rise .65s ease both; }
body.page-template-page-surf-debutant main > section:nth-child(2), body.page-template-page-surf-intermediaire main > section:nth-child(2) { animation-delay: .1s; }
body.page-template-page-surf-debutant main > section:nth-child(3), body.page-template-page-surf-intermediaire main > section:nth-child(3) { animation-delay: .18s; }
.isni-surf-menu > div a:hover { background: #f2e8df; color: #f05a2d !important; border-radius: 8px; }
@media (max-width: 900px) {
  .isni-top-bar > div { flex-wrap: wrap; gap: 12px !important; }
  .isni-nav { flex-wrap: wrap; gap: 10px 16px !important; }
  .isni-nav a, .isni-surf-menu { font-size: .82rem !important; }
}
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; } }
`;

  const functionsPhp = `<?php
/**
 * Residence ISNI Theme Functions & Definitions
 * WordPress 7.1.3 & PHP 8.1+ Compatible
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ISNI_VERSION', '1.0.0');

// 1. Enqueue Scripts, Styles & Fonts
function isni_enqueue_scripts() {
    // Google Fonts
    wp_enqueue_style(
        'isni-google-fonts',
        'https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800;900&family=Bebas+Neue&family=Permanent+Marker&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sedgwick+Ave+Display&display=swap',
        array(),
        null
    );

    // Main Theme Stylesheet
    wp_enqueue_style('isni-style', get_stylesheet_uri(), array(), ISNI_VERSION);

    // Booking JS
    wp_enqueue_script(
        'isni-booking',
        get_template_directory_uri() . '/assets/booking.js',
        array(),
        ISNI_VERSION,
        true
    );

    // Localize Data for AJAX
    wp_localize_script('isni-booking', 'isniData', array(
        'ajaxUrl'   => admin_url('admin-ajax.php'),
        'nonce'     => wp_create_nonce('isni_booking_nonce'),
        'sheetUrl'  => get_option('isni_sheet_url', ''),
        'whatsapp'  => get_option('isni_whatsapp', '+212 528 820 467'),
        'rooms'     => isni_get_rooms(),
        'breakfast' => isni_get_breakfast()
    ));
}
add_action('wp_enqueue_scripts', 'isni_enqueue_scripts');

function isni_ensure_surf_pages() {
    static $checked = false;
    if ($checked) return;
    $checked = true;
    $rewrite_rules_changed = false;
    $pages = array(
        'debutant' => array('Surf Débutant', 'page-surf-debutant.php'),
        'intermediaire' => array('Surf Intermédiaire', 'page-surf-intermediaire.php')
    );

    foreach ($pages as $level => $settings) {
        $slug = 'surf-' . $level;
        $page = get_page_by_path($slug, OBJECT, 'page');
        if (!$page) {
            $page_id = wp_insert_post(array(
                'post_type' => 'page',
                'post_status' => 'publish',
                'post_title' => $settings[0],
                'post_name' => $slug
            ), true);
            if (is_wp_error($page_id)) continue;
            $page = get_post($page_id);
            $rewrite_rules_changed = true;
        }

        if ($page && get_post_meta($page->ID, '_wp_page_template', true) !== $settings[1]) {
            update_post_meta($page->ID, '_wp_page_template', $settings[1]);
        }
    }

    if ($rewrite_rules_changed) flush_rewrite_rules(false);
}
add_action('after_switch_theme', 'isni_ensure_surf_pages');
function isni_admin_ensure_surf_pages() {
    if (current_user_can('edit_pages')) isni_ensure_surf_pages();
}
add_action('admin_init', 'isni_admin_ensure_surf_pages', 20);

function isni_get_surf_page_url($level) {
    $slug = 'surf-' . sanitize_title($level);
    $page = get_page_by_path($slug, OBJECT, 'page');
    return $page ? get_permalink($page) : home_url('/#activites');
}

// 2. Custom Post Type: isni_booking
function isni_register_cpt_booking() {
    $labels = array(
        'name'               => 'Réservations',
        'singular_name'      => 'Réservation',
        'menu_name'          => 'Réservations ISNI',
        'all_items'          => 'Toutes les réservations',
        'view_item'          => 'Voir réservation',
        'search_items'       => 'Chercher réservation',
        'not_found'          => 'Aucune réservation trouvée'
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-calendar-alt',
        'capability_type'    => 'post',
        'hierarchical'       => false,
        'supports'           => array('title', 'custom-fields'),
    );
    register_post_type('isni_booking', $args);
}
add_action('init', 'isni_register_cpt_booking');

// 3. Settings Menu in Admin (Réglages > Résidence)
function isni_add_admin_menu() {
    add_options_page(
        'Paramètres Résidence ISNI',
        'Résidence ISNI',
        'manage_options',
        'isni-settings',
        'isni_render_settings_page'
    );
}
add_action('admin_menu', 'isni_add_admin_menu');

function isni_register_settings() {
    register_setting('isni_settings_group', 'isni_phone');
    register_setting('isni_settings_group', 'isni_email');
    register_setting('isni_settings_group', 'isni_address');
    register_setting('isni_settings_group', 'isni_whatsapp');
    register_setting('isni_settings_group', 'isni_sheet_url');
    register_setting('isni_settings_group', 'isni_rooms_data');
    register_setting('isni_settings_group', 'isni_activities_data');
    register_setting('isni_settings_group', 'isni_breakfast_data');
}
add_action('admin_init', 'isni_register_settings');

function isni_render_settings_page() {
    ?>
    <div class="wrap">
        <h1>Configuration Résidence ISNI</h1>
        <form method="post" action="options.php">
            <?php settings_fields('isni_settings_group'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">Téléphone</th>
                    <td><input type="text" name="isni_phone" value="<?php echo esc_attr(get_option('isni_phone', '+212 528 820 467')); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">WhatsApp</th>
                    <td><input type="text" name="isni_whatsapp" value="<?php echo esc_attr(get_option('isni_whatsapp', '+212 528 820 467')); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">Email de réception</th>
                    <td><input type="email" name="isni_email" value="<?php echo esc_attr(get_option('isni_email', 'contact@residence-isni.ma')); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">Adresse</th>
                    <td><input type="text" name="isni_address" value="<?php echo esc_attr(get_option('isni_address', 'Avenue Allal Ben Abdellah, Agadir')); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">URL Google Apps Script Web App</th>
                    <td>
                        <input type="url" name="isni_sheet_url" value="<?php echo esc_attr(get_option('isni_sheet_url', '')); ?>" class="large-text">
                        <p class="description">URL de la Web App Google Apps Script connectée à votre Google Sheet.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Chambres (code|Nom|capacité|prix MAD/nuit|description)</th>
                    <td>
                        <textarea name="isni_rooms_data" rows="5" class="large-text"><?php echo esc_textarea(get_option('isni_rooms_data', "simple|Chambre simple · 1 personne|1|320|Tarif par nuit selon le barème fourni\ndouble|Chambre double · 2 personnes|2|420|Tarif par nuit selon le barème fourni\ntriple|Chambre triple · 3 personnes|3|480|Tarif par nuit selon le barème fourni\nquadruple|Chambre quadruple · 4 personnes|4|520|Tarif par nuit selon le barème fourni")); ?></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Activités (une ligne par niveau : Nom|Prix|Description)</th>
                    <td>
                        <textarea name="isni_activities_data" rows="3" class="large-text"><?php echo esc_textarea(get_option('isni_activities_data', "Surf · Débutant · Taghazout|Tarif à confirmer|Sortie de surf encadrée avec transport, planche, combinaison et déjeuner annoncés sur l’affiche\nSurf · Intermédiaire · Taghazout|Tarif à confirmer|Sortie de surf encadrée avec transport, planche, combinaison et déjeuner annoncés sur l’affiche")); ?></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Petit-déjeuner (code|Nom|prix DH|éléments;séparés)</th>
                    <td>
                        <textarea name="isni_breakfast_data" rows="4" class="large-text"><?php echo esc_textarea(get_option('isni_breakfast_data', "continental|Continental|35|Café ou thé;Jus d'orange;Omelette;Pain, beurre, fromage et charcuterie\nexpress|Express|30|Café ou thé;Jus d'orange;Petit pain au chocolat\nbeldi|Beldi|35|Café ou thé;1 msemen ou 1 batbout;Jus d'orange;Huile d'olive et fromage")); ?></textarea>
                    </td>
                </tr>
            </table>
            <?php submit_button('Enregistrer les réglages'); ?>
        </form>
    </div>
    <?php
}

// 4. Data Helpers
function isni_get_rooms() {
    $raw = get_option('isni_rooms_data', "simple|Chambre simple · 1 personne|1|320|Tarif par nuit selon le barème fourni\ndouble|Chambre double · 2 personnes|2|420|Tarif par nuit selon le barème fourni\ntriple|Chambre triple · 3 personnes|3|480|Tarif par nuit selon le barème fourni\nquadruple|Chambre quadruple · 4 personnes|4|520|Tarif par nuit selon le barème fourni");
    $lines = explode("\n", trim($raw));
    $rooms = array();
    foreach ($lines as $line) {
        $parts = explode('|', trim($line));
        if (count($parts) >= 5) {
            $rooms[$parts[0]] = array(
                'code'        => $parts[0],
                'name'        => $parts[1],
                'capacity'    => intval($parts[2]),
                'price'       => floatval($parts[3]),
                'description' => $parts[4]
            );
        }
    }
    return $rooms;
}

function isni_get_breakfast() {
    $raw = get_option('isni_breakfast_data', "continental|Continental|35|Café ou thé;Jus d'orange;Omelette;Pain, beurre, fromage et charcuterie\nexpress|Express|30|Café ou thé;Jus d'orange;Petit pain au chocolat\nbeldi|Beldi|35|Café ou thé;1 msemen ou 1 batbout;Jus d'orange;Huile d'olive et fromage");
    $lines = explode("\n", trim($raw));
    $bf = array();
    foreach ($lines as $line) {
        $parts = explode('|', trim($line));
        if (count($parts) >= 4) {
            $bf[$parts[0]] = array(
                'code'  => $parts[0],
                'name'  => $parts[1],
                'price' => floatval($parts[2]),
                'items' => explode(';', $parts[3])
            );
        }
    }
    return $bf;
}

// 5. AJAX Availability Endpoint
function isni_ajax_avail() {
    wp_send_json_success(array(
        'room' => sanitize_text_field($_GET['room'] ?? 'double'),
        'fullyBookedDates' => array(),
        'message' => 'La disponibilité est confirmée par la réception après réception de la demande.'
    ));
}
add_action('wp_ajax_isni_avail', 'isni_ajax_avail');
add_action('wp_ajax_nopriv_isni_avail', 'isni_ajax_avail');

// 6. AJAX Booking Submission
function isni_ajax_book() {
    // Nonce check
    if (!check_ajax_referer('isni_booking_nonce', 'nonce', false)) {
        wp_send_json_error(array('message' => 'Session expirée. Veuillez recharger la page.'));
    }

    // Honeypot check
    if (!empty($_POST['website'])) {
        wp_send_json_error(array('message' => 'Anti-spam validation failed.'));
    }

    $name    = sanitize_text_field($_POST['full_name'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? '');
    $phone   = sanitize_text_field($_POST['phone'] ?? '');
    $room    = sanitize_text_field($_POST['room_type'] ?? 'double');
    $check_in= sanitize_text_field($_POST['check_in'] ?? '');
    $check_out= sanitize_text_field($_POST['check_out'] ?? '');
    $guests  = max(1, intval($_POST['guests'] ?? 1));
    $bf_code = sanitize_text_field($_POST['breakfast'] ?? 'none');
    $notes   = sanitize_textarea_field($_POST['notes'] ?? '');
    $activities = sanitize_text_field($_POST['activities'] ?? '');

    if (empty($name) || empty($email) || empty($phone) || empty($check_in) || empty($check_out)) {
        wp_send_json_error(array('message' => 'Veuillez remplir tous les champs obligatoires.'));
    }

    $d_in = strtotime($check_in);
    $d_out = strtotime($check_out);
    $today = strtotime(date('Y-m-d'));

    if ($d_in < $today || $d_out <= $d_in) {
        wp_send_json_error(array('message' => 'Dates de séjour invalides.'));
    }

    $nights = max(1, round(($d_out - $d_in) / (60 * 60 * 24)));
    if ($nights > 30) {
        wp_send_json_error(array('message' => 'La durée maximale en ligne est de 30 nuits.'));
    }

    // Calculate total price server-side
    $rooms = isni_get_rooms();
    if (!isset($rooms[$room])) {
        wp_send_json_error(array('message' => 'Veuillez choisir un type de chambre valide.'));
    }
    if ($guests > $rooms[$room]['capacity']) {
        wp_send_json_error(array('message' => 'Le nombre de voyageurs dépasse la capacité de la chambre choisie.'));
    }
    $room_price_night = $rooms[$room]['price'];
    $breakfasts = isni_get_breakfast();
    $bf_price_person = isset($breakfasts[$bf_code]) ? $breakfasts[$bf_code]['price'] : 0;

    $total = ($nights * $room_price_night) + ($nights * $bf_price_person * $guests);

    // Save as CPT isni_booking
    $post_id = wp_insert_post(array(
        'post_type'   => 'isni_booking',
        'post_title'  => "Réservation - " . $name . " (" . $check_in . " au " . $check_out . ")",
        'post_status' => 'publish'
    ));

    if (is_wp_error($post_id)) {
        wp_send_json_error(array('message' => 'Erreur lors de l’enregistrement de votre demande.'));
    }

    update_post_meta($post_id, '_isni_guest_name', $name);
    update_post_meta($post_id, '_isni_email', $email);
    update_post_meta($post_id, '_isni_phone', $phone);
    update_post_meta($post_id, '_isni_room', $room);
    update_post_meta($post_id, '_isni_check_in', $check_in);
    update_post_meta($post_id, '_isni_check_out', $check_out);
    update_post_meta($post_id, '_isni_nights', $nights);
    update_post_meta($post_id, '_isni_guests', $guests);
    update_post_meta($post_id, '_isni_breakfast', $bf_code);
    update_post_meta($post_id, '_isni_total_mad', $total);
    update_post_meta($post_id, '_isni_status', 'en_attente');
    update_post_meta($post_id, '_isni_notes', $notes);
    update_post_meta($post_id, '_isni_activities', $activities);

    // Send email to admin
    $admin_email = get_option('isni_email', 'contact@residence-isni.ma');
    $subject = "Nouvelle demande de réservation Résidence ISNI - " . $name;
    $body = "Nouvelle réservation reçue :\\n\\n"
          . "Nom : $name\\n"
          . "Email : $email\\n"
          . "Téléphone : $phone\\n"
          . "Chambre : $room\\n"
          . "Dates : du $check_in au $check_out ($nights nuits)\\n"
          . "Personnes : $guests\\n"
          . "Formule Petit-déjeuner : $bf_code\\n"
          . "Activités demandées : $activities\\n"
          . "Total estimé : $total MAD\\n"
          . "Notes : $notes\\n\\n"
          . "Gérer la réservation : " . admin_url('post.php?post=' . $post_id . '&action=edit');
    wp_mail($admin_email, $subject, $body);

    // Sync to Google Sheet via Google Apps Script Web App URL
    $sheet_url = get_option('isni_sheet_url', '');
    $sheet_sync_warning = empty($sheet_url);
    if (!empty($sheet_url)) {
        $sheet_payload = array(
            'id'            => 'ISNI-' . $post_id,
            'timestamp'     => current_time('mysql'),
            'fullName'      => $name,
            'email'         => $email,
            'phone'         => $phone,
            'roomType'      => $rooms[$room]['name'],
            'roomCode'      => $room,
            'checkIn'       => $check_in,
            'checkOut'      => $check_out,
            'nights'        => $nights,
            'guests'        => $guests,
            'breakfast'     => isset($breakfasts[$bf_code]) ? $breakfasts[$bf_code]['name'] : 'Sans petit-déjeuner',
            'breakfastCode' => $bf_code,
            'roomPriceMAD'  => $nights * $room_price_night,
            'breakfastPriceMAD' => $nights * $bf_price_person * $guests,
            'activities'    => $activities,
            'totalPriceMAD' => $total,
            'status'        => 'en_attente',
            'notes'         => $notes
        );

        $sheet_response = wp_remote_post($sheet_url, array(
            'headers'     => array('Content-Type' => 'application/json; charset=utf-8'),
            'body'        => wp_json_encode($sheet_payload),
            'method'      => 'POST',
            'data_format' => 'body',
            'timeout'     => 15,
            'blocking'    => true
        ));
        if (is_wp_error($sheet_response) || wp_remote_retrieve_response_code($sheet_response) >= 400) {
            $sheet_sync_warning = true;
            error_log('ISNI Google Sheets sync failed for booking ISNI-' . $post_id . ': ' . (is_wp_error($sheet_response) ? $sheet_response->get_error_message() : wp_remote_retrieve_response_code($sheet_response)));
        } else {
            $sheet_result = json_decode(wp_remote_retrieve_body($sheet_response), true);
            if (!is_array($sheet_result) || ($sheet_result['status'] ?? '') !== 'success') {
                $sheet_sync_warning = true;
                error_log('ISNI Google Sheets webhook did not confirm booking ISNI-' . $post_id . '.');
            }
        }
    }

    wp_send_json_success(array(
        'bookingId' => 'ISNI-' . $post_id,
        'message'   => 'Votre demande a été enregistrée dans WordPress. La résidence vous contactera pour confirmer la disponibilité.',
        'sheetSyncWarning' => $sheet_sync_warning,
        'totalMAD'  => $total
    ));
}
add_action('wp_ajax_isni_book', 'isni_ajax_book');
add_action('wp_ajax_nopriv_isni_book', 'isni_ajax_book');
`;

  const headerPhp = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="isni-top-bar" style="background:#f2e8df;border-bottom:1px solid rgba(6,48,107,0.1);position:sticky;top:0;z-index:99;padding:16px 24px;">
    <div style="max-width:1440px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;">
        <a href="<?php echo esc_url(home_url('/')); ?>" style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#06306b;text-decoration:none;letter-spacing:0.05em;white-space:nowrap;">
            RÉSIDENCE ISNI <span style="font-family:'Permanent Marker',cursive;color:#f05a2d;font-size:1.3rem;">AGADIR</span>
        </a>

        <nav class="isni-nav" style="display:flex;align-items:center;gap:24px;">
            <a href="<?php echo esc_url(home_url('/#pourquoi')); ?>" style="color:#06306b;text-decoration:none;font-weight:600;font-size:0.95rem;">Pourquoi</a>
            <a href="<?php echo esc_url(home_url('/#chambres')); ?>" style="color:#06306b;text-decoration:none;font-weight:600;font-size:0.95rem;">Chambres</a>
            <div class="isni-surf-menu" style="position:relative;display:inline-flex;align-items:center;gap:6px;color:#06306b;font-weight:600;font-size:.95rem;cursor:pointer;">
                <span tabindex="0">Surf⌄</span>
                <div style="display:none;position:absolute;top:100%;left:0;min-width:180px;padding:8px;background:#fff;border-radius:12px;box-shadow:0 12px 28px rgba(6,48,107,.18);">
                    <a href="<?php echo esc_url(isni_get_surf_page_url('debutant')); ?>" style="display:block;padding:10px 12px;color:#06306b;text-decoration:none;">Débutant</a>
                    <a href="<?php echo esc_url(isni_get_surf_page_url('intermediaire')); ?>" style="display:block;padding:10px 12px;color:#06306b;text-decoration:none;">Intermédiaire</a>
                </div>
            </div>
            <a href="<?php echo esc_url(home_url('/#petit-dejeuner')); ?>" style="color:#06306b;text-decoration:none;font-weight:600;font-size:0.95rem;">Petit-Déjeuner</a>
            <a href="<?php echo esc_url(home_url('/#a-savoir')); ?>" style="color:#06306b;text-decoration:none;font-weight:600;font-size:0.95rem;">À Savoir</a>
        </nav>

    </div>
</header>
<script>
document.addEventListener('DOMContentLoaded', function(){ const menu=document.querySelector('.isni-surf-menu'); if(!menu)return; const panel=menu.querySelector('div'); const trigger=menu.querySelector('span'); trigger.addEventListener('click',function(){panel.style.display=panel.style.display==='block'?'none':'block';}); menu.addEventListener('mouseenter',function(){panel.style.display='block';}); menu.addEventListener('mouseleave',function(){panel.style.display='none';}); });
</script>
`;

  const footerPhp = `<footer style="background:#06306b;color:#f2e8df;padding:64px 24px 32px;margin-top:64px;">
    <div style="max-width:1440px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:48px;">
        <div>
            <h3 style="font-family:'Bebas Neue',sans-serif;font-size:2.4rem;color:#ffffff;letter-spacing:0.05em;margin-bottom:12px;">
                RÉSIDENCE ISNI
            </h3>
            <p style="color:#cfe5d8;max-width:320px;margin-bottom:20px;font-size:0.95rem;">
                Appart-hôtel à Agadir avec chambres de 1 à 4 personnes, petit-déjeuner en option et sortie surf à Taghazout sur demande.
            </p>
            <p style="color:#f29acb;font-weight:700;"><?php echo esc_html(get_option('isni_address', 'Avenue Allal Ben Abdellah, Agadir')); ?></p>
        </div>

        <div>
            <h4 style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:#f05a2d;letter-spacing:0.05em;margin-bottom:16px;">
                CONTACT & WHATSAPP
            </h4>
            <p style="margin-bottom:8px;">Téléphone : <a href="tel:<?php echo esc_attr(get_option('isni_phone', '+212528820467')); ?>" style="color:#ffffff;text-decoration:none;"><?php echo esc_html(get_option('isni_phone', '+212 528 820 467')); ?></a></p>
            <p style="margin-bottom:8px;">WhatsApp : <a href="https://wa.me/<?php echo esc_attr(preg_replace('/[^0-9]/', '', get_option('isni_whatsapp', '+212528820467'))); ?>" style="color:#ffffff;text-decoration:none;"><?php echo esc_html(get_option('isni_whatsapp', '+212 528 820 467')); ?></a></p>
            <p style="margin-bottom:8px;">E-mail : <a href="mailto:<?php echo esc_attr(get_option('isni_email', 'contact@residence-isni.ma')); ?>" style="color:#ffffff;text-decoration:none;"><?php echo esc_html(get_option('isni_email', 'contact@residence-isni.ma')); ?></a></p>
        </div>

        <div>
            <h4 style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:#f05a2d;letter-spacing:0.05em;margin-bottom:16px;">
                INFOS PRATIQUES
            </h4>
            <p style="color:#cfe5d8;margin-bottom:8px;">• Wi-Fi gratuit</p>
            <p style="color:#cfe5d8;margin-bottom:8px;">• Kitchenette et réfrigérateur dans les logements</p>
            <p style="color:#cfe5d8;margin-bottom:8px;">• Petit-déjeuner en supplément</p>
        </div>
    </div>

    <div style="max-width:1440px;margin:48px auto 0;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;font-size:0.85rem;color:#cfe5d8;">
        <p>&copy; <?php echo date('Y'); ?> Résidence ISNI · Appart-Hôtel Agadir. Tous droits réservés.</p>
        <p>Inspiré par le lifestyle surf marocain</p>
    </div>
</footer>

<div id="isni-preloader" class="isni-preloader" role="status" aria-live="polite" aria-label="Chargement de la Résidence ISNI">
    <div class="isni-preloader-backdrop" style="background-image:linear-gradient(180deg,rgba(3,31,47,.34),rgba(3,31,47,.62)),url('<?php echo esc_url(get_template_directory_uri() . '/assets/images/surf_lesson_taghazout_1793212942727.jpg'); ?>');"></div>
    <div class="isni-preloader-content">
        <div class="isni-preloader-mark" aria-hidden="true">≈</div>
        <p class="isni-preloader-kicker">Agadir · Maroc</p>
        <h1 class="isni-preloader-title">RÉSIDENCE ISNI</h1>
        <p class="isni-preloader-caption">Préparez-vous à prendre le large</p>
        <div class="isni-preloader-board" aria-hidden="true"></div>
        <div class="isni-preloader-progress" aria-hidden="true"><span></span></div>
        <span class="screen-reader-text">Chargement en cours…</span>
    </div>
    <svg class="isni-preloader-waves" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
        <path class="isni-wave-back" fill="rgba(31,111,120,.78)" d="M0,160 C180,220 260,90 450,145 C640,205 750,275 960,180 C1150,95 1270,125 1440,170 L1440,320 L0,320 Z" />
        <path class="isni-wave-front" fill="#f2e8df" d="M0,210 C170,140 310,235 490,195 C700,145 820,120 1010,205 C1180,280 1290,225 1440,185 L1440,320 L0,320 Z" />
    </svg>
</div>
<script>(function(){var el=document.getElementById('isni-preloader');if(!el)return;var done=false;function hide(){if(done)return;done=true;var wait=Math.max(0,1500-(performance.now()-started));window.setTimeout(function(){el.classList.add('is-leaving');window.setTimeout(function(){if(el.parentNode)el.remove();},380);},wait);}var started=performance.now();if(document.readyState==='complete')hide();else window.addEventListener('load',hide,{once:true});window.setTimeout(hide,2200);}());</script>

<?php wp_footer(); ?>
</body>
</html>
`;

  const frontPagePhp = `<?php
/**
 * Template Name: Accueil Résidence ISNI
 * Front Page Template
 */

get_header(); ?>

<main id="primary" class="site-main">

    <!-- HERO SECTION -->
    <section class="isni-hero" style="position:relative;background:#f2e8df;padding:48px 24px 80px;overflow:hidden;">
        <div style="position:absolute;top:10px;left:50%;transform:translateX(-50%);white-space:nowrap;z-index:0;" class="ghost-title">
            RÉSIDENCE ISNI
        </div>

        <div style="max-width:1440px;margin:0 auto;position:relative;z-index:2;display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:48px;align-items:center;">
            <div>
                <span style="display:inline-block;background:#06306b;color:#f2e8df;padding:6px 16px;border-radius:9999px;font-size:0.85rem;font-weight:700;text-transform:uppercase;margin-bottom:16px;">
                    Appart-Hôtel & Surf Lifestyle · Agadir
                </span>
                <h1 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,6vw,5.5rem);line-height:0.95;color:#06306b;margin-bottom:16px;">
                    L'ESPRIT SURF <br>
                    <span style="font-family:'Permanent Marker',cursive;color:#f05a2d;">& HOSPITALITÉ MAROCAINE</span>
                </h1>
                <p style="font-size:1.15rem;color:#06306b;max-width:520px;margin-bottom:28px;">
                    Établissement d’hébergement moderne de 29 chambres, Résidence Isni propose des séjours confortables et fonctionnels aux voyageurs de loisirs comme d’affaires. Située avenue Allal Ben Abdellah, elle offre un équilibre entre confort, intimité et accessibilité, près des restaurants, commerces, cafés, musées et principales attractions d’Agadir.
                </p>
                <div style="display:flex;gap:16px;flex-wrap:wrap;">
                    <a href="#reservation" class="btn-primary">Réserver mon séjour</a>
                    <a href="<?php echo esc_url(home_url('/#chambres')); ?>" style="display:inline-block;padding:14px 28px;border-radius:9999px;border:2px solid #06306b;color:#06306b;font-weight:700;text-transform:uppercase;text-decoration:none;">Voir les chambres</a>
                </div>
            </div>

            <div style="border-radius:24px;overflow:hidden;box-shadow:0 20px 40px rgba(6,48,107,0.12);transform:rotate(1deg);border:4px solid #ffffff;">
                <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/isni/family-suite.jpg'); ?>" alt="Salon et salle à manger d’une suite de la Résidence ISNI" style="width:100%;height:auto;display:block;min-height:380px;object-fit:cover;">
            </div>
        </div>
    </section>

    <!-- TICKER STRIP -->
    <div style="background:#06306b;color:#f2e8df;padding:16px 0;overflow:hidden;white-space:nowrap;font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:0.1em;">
        <div style="display:inline-block;animation:scrollText 25s linear infinite;">
            29 CHAMBRES · TARIFS PAR NUIT · PETIT-DÉJEUNER EN OPTION · SORTIE SURF À TAGHAZOUT SUR DEMANDE ·
        </div>
    </div>

    <!-- SECTION POURQUOI -->
    <section id="pourquoi" style="padding:80px 24px;max-width:1440px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:48px;">
            <span style="font-family:'Permanent Marker',cursive;color:#f05a2d;font-size:1.4rem;">L'Expérience ISNI</span>
            <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4rem);color:#06306b;">
                POURQUOI CHOISIR NOTRE RÉSIDENCE ?
            </h2>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
            <div class="card-panel" style="padding:32px;background:#ffffff;">
                <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#f05a2d;">01</div>
                <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:8px;">Emplacement Central</h3>
                <p style="color:#4a5568;">Proche des restaurants, commerces, cafés, musées et principales attractions d’Agadir.</p>
            </div>
            <div class="card-panel" style="padding:32px;background:#ffffff;">
                <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#f29acb;">02</div>
                <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:8px;">Wi-Fi et kitchenette</h3>
                <p style="color:#4a5568;">Des équipements signalés dans les informations publiques de l’établissement.</p>
            </div>
            <div class="card-panel" style="padding:32px;background:#ffffff;">
                <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#1f6f78;">03</div>
                <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:8px;">Petit-Déjeuner Beldi & Frais</h3>
                <p style="color:#4a5568;">Formules Continental (35 DH), Express (30 DH) ou Beldi (35 DH), par personne et par jour.</p>
            </div>
            <div class="card-panel" style="padding:32px;background:#ffffff;">
                <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#06306b;">04</div>
                <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:8px;">Sortie surf à Taghazout</h3>
                <p style="color:#4a5568;">Transport vers les spots, planche et combinaison, moniteur et déjeuner annoncés sur l’affiche. Tarif à confirmer.</p>
            </div>
        </div>
    </section>

    <!-- SECTION CHAMBRES (PANNEAUX 50/50) -->
    <section id="chambres" style="padding:60px 24px;background:#faf5f0;">
        <div style="max-width:1440px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:48px;">
                <span style="font-family:'Permanent Marker',cursive;color:#f05a2d;font-size:1.4rem;">Nos Hébergements</span>
                <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4rem);color:#06306b;">
                    29 CHAMBRES ET SUITES DE CHARME
                </h2>
            </div>

            <?php
            $rooms = isni_get_rooms();
            $room_images = array(
                'simple'    => get_template_directory_uri() . '/assets/images/isni/twin-bedroom.jpg',
                'double'    => get_template_directory_uri() . '/assets/images/isni/living-room.jpg',
                'triple'    => get_template_directory_uri() . '/assets/images/isni/family-suite.jpg',
                'quadruple' => get_template_directory_uri() . '/assets/images/isni/family-suite.jpg'
            );
            $idx = 0;
            foreach ($rooms as $code => $r):
                $reverse = ($idx % 2 === 1);
            ?>
            <div class="card-panel" style="margin-bottom:40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));overflow:hidden;">
                <div class="isni-image-drift" style="<?php echo $reverse ? 'order:2;' : ''; ?>min-height:340px;background:#e8d9cc;">
                    <img src="<?php echo esc_url($room_images[$code] ?? ''); ?>" alt="<?php echo esc_attr($r['name']); ?>" style="width:100%;height:100%;object-fit:cover;display:block;">
                </div>
                <div style="padding:48px 36px;display:flex;flex-direction:column;justify-content:center;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                        <span style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#f05a2d;"><?php echo esc_html($r['price']); ?> MAD <span style="font-size:1rem;font-family:sans-serif;font-weight:normal;">/ nuit</span></span>
                    </div>
                    <h3 style="font-family:'Bebas Neue',sans-serif;font-size:2.2rem;color:#06306b;margin-bottom:12px;"><?php echo esc_html($r['name']); ?></h3>
                    <p style="color:#4a5568;margin-bottom:24px;line-height:1.6;"><?php echo esc_html($r['description']); ?></p>
                    <div>
                        <a href="#reservation" class="btn-primary" onclick="if(window.isniSelectRoom) window.isniSelectRoom('<?php echo esc_js($code); ?>');">
                            Choisir cette chambre
                        </a>
                    </div>
                </div>
            </div>
            <?php
            $idx++;
            endforeach;
            ?>
            <h3 style="font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:#06306b;margin:72px 0 8px;text-align:center;">STUDIOS & APPARTEMENTS</h3>
            <p style="max-width:780px;margin:0 auto 32px;text-align:center;color:#4a5568;line-height:1.65;">Les superficies et équipements ci-dessous reprennent les descriptifs transmis. Le tarif dépend du nombre de personnes, selon le barème affiché plus haut.</p>
            <?php
            $accommodation_details = array(
                array('Studio Confort', '36 m²', 'kitchenette.jpg', 'Pensé pour allier confort et fonctionnalité, le studio offre une vue agréable sur le jardin Ibn Zaidoun. Il comprend un grand lit, deux canapés-lits et une kitchenette entièrement équipée. Salle de bain privée avec douche et WC, Wi-Fi gratuit.'),
                array('Studio quadruple · vue jardin', '36 m²', 'twin-bedroom.jpg', 'Configuration adaptée aux familles ou aux amis, avec trois lits simples et deux canapés-lits. Kitchenette équipée, salle de bain privée avec douche et WC, Wi-Fi gratuit et balcon avec vue sur le jardin Ibn Zaidoun.'),
                array('Chambre quadruple avec balcon', '36 m²', 'family-suite.jpg', 'Peut accueillir jusqu’à quatre personnes avec deux lits simples et deux canapés-lits. Kitchenette équipée, salle de bain privée avec douche et WC, balcon et Wi-Fi gratuit. La vue jardin dépend de la disponibilité.'),
                array('Appartement deux chambres', '55 m²', 'twin-bedroom.jpg', 'Hébergement spacieux avec deux chambres séparées, un salon, trois lits simples, un lit double et deux canapés-lits. Kitchenette équipée, salle de bain privée avec douche et WC, Wi-Fi gratuit. Balcon avec vue jardin selon disponibilité.'),
                array('Appartement une chambre', '36 m²', 'living-room.jpg', 'Espace fonctionnel avec deux lits simples et deux canapés-lits, kitchenette équipée, salle de bain privée avec douche et WC et Wi-Fi gratuit. Balcon avec vue sur le jardin Ibn Zaidoun selon disponibilité.')
            );
            ?>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin:28px 0 60px;">
                <?php foreach ($accommodation_details as $stay): ?>
                <article class="card-panel" style="overflow:hidden;background:#fff;">
                    <div class="isni-image-drift" style="aspect-ratio:16/10;"><img loading="lazy" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/isni/' . $stay[2]); ?>" alt="Espace de la Résidence ISNI · <?php echo esc_attr($stay[0]); ?>" style="width:100%;height:100%;object-fit:cover;display:block;"></div>
                    <div style="padding:22px;"><span style="display:inline-block;border-radius:999px;background:#f2e8df;color:#06306b;padding:4px 11px;font-size:.8rem;font-weight:700;margin-bottom:8px;"><?php echo esc_html($stay[1]); ?></span><h4 style="font-family:'Bebas Neue',sans-serif;font-size:1.65rem;color:#06306b;margin-bottom:8px;"><?php echo esc_html($stay[0]); ?></h4><p style="font-size:.92rem;line-height:1.65;color:#4a5568;"><?php echo esc_html($stay[3]); ?></p></div>
                </article>
                <?php endforeach; ?>
            </div>
            <div style="margin:72px 0 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">
                <?php foreach (array('Salon'=>'living-room.jpg','Chambre'=>'twin-bedroom.jpg','Équipements'=>'kitchenette.jpg','Suite'=>'family-suite.jpg','Restauration'=>'dining-room.jpg','Vue'=>'balcony.jpg') as $label=>$image): ?>
                <figure class="card-panel isni-image-drift" style="position:relative;min-height:210px;">
                    <img loading="lazy" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/isni/' . $image); ?>" alt="<?php echo esc_attr($label); ?> de la Résidence ISNI" style="width:100%;height:100%;min-height:210px;object-fit:cover;display:block;">
                    <figcaption style="position:absolute;bottom:0;left:0;right:0;padding:30px 16px 12px;color:white;font-weight:700;background:linear-gradient(transparent,rgba(6,48,107,.75));"><?php echo esc_html($label); ?></figcaption>
                </figure>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- AFFICHE SURF -->
    <section id="activites" style="padding:72px 24px;background:#06306b;color:#f2e8df;">
        <div style="max-width:1120px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px;align-items:center;">
            <div class="isni-image-drift" style="border-radius:24px;max-height:560px;min-height:360px;">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/surf_lesson_taghazout_1793212942727.jpg'); ?>" alt="Surfeurs en session sur la côte marocaine" style="width:100%;height:100%;max-height:560px;min-height:360px;object-fit:cover;border-radius:24px;">
            </div>
            <div style="padding:12px 0;">
                <span style="font-family:'Permanent Marker',cursive;color:#f29acb;">RÉSIDENCE ISNI · AGADIR</span>
                <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,6vw,5rem);line-height:.9;color:#fff;margin:12px 0 20px;">PREMIERS PAS SURF À TAGHAZOUT</h2>
                <p style="font-size:1.05rem;line-height:1.7;color:#f2e8df;">Excursion à Taghazout avec session de surf. L’affiche de la résidence indique le transport vers les spots, la planche et la combinaison, un moniteur et le déjeuner inclus.</p>
                <p style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:#f29acb;">TARIF À CONFIRMER AVEC LA RÉCEPTION</p>
                <p style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:#f29acb;">CHOISISSEZ VOTRE NIVEAU</p>
                <div style="display:flex;flex-wrap:wrap;gap:12px;">
                    <a class="btn-primary" href="<?php echo esc_url(isni_get_surf_page_url('debutant')); ?>">Débutant · Découvrir le parcours</a>
                    <a class="btn-primary" href="<?php echo esc_url(isni_get_surf_page_url('intermediaire')); ?>">Intermédiaire · Voir le parcours</a>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION PETIT-DÉJEUNER -->
    <section id="petit-dejeuner" style="padding:80px 24px;max-width:1440px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:48px;">
            <span style="font-family:'Permanent Marker',cursive;color:#f05a2d;font-size:1.4rem;">Formules Matinales</span>
            <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4rem);color:#06306b;">
                LE MENU PETIT-DÉJEUNER
            </h2>
            <p style="color:#4a5568;max-width:600px;margin:0 auto;">
                Préparé chaque matin sur place avec des ingrédients frais. Choisissez votre formule préférée lors de votre réservation !
            </p>
        </div>

        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/breakfast-menu.webp'); ?>" alt="Carte des formules petit-déjeuner" style="display:block;width:min(100%,760px);height:auto;margin:0 auto 32px;border-radius:16px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px;">
            <?php
            $bf_list = isni_get_breakfast();
            $bf_colors = array('continental' => '#f05a2d', 'express' => '#f05a2d', 'beldi' => '#f05a2d');
            foreach ($bf_list as $code => $b):
            ?>
            <div class="card-panel" style="padding:32px;display:flex;flex-direction:column;justify-content:space-between;border-top:6px solid #1f6f78;">
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                        <h3 style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#06306b;"><?php echo esc_html($b['name']); ?></h3>
                        <span style="background:#f05a2d;color:#ffffff;font-weight:700;padding:6px 14px;border-radius:9999px;font-size:0.95rem;">
                            <?php echo esc_html($b['price']); ?> DH
                        </span>
                    </div>
                    <ul style="list-style:none;padding:0;margin-bottom:24px;">
                        <?php foreach ($b['items'] as $item): ?>
                        <li style="padding:6px 0;color:#2d3748;display:flex;align-items:center;gap:8px;">
                            <span style="color:#1f6f78;">✔</span> <?php echo esc_html(trim($item)); ?>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <button type="button" class="btn-primary" style="width:100%;text-align:center;" onclick="if(window.isniSelectBreakfast) window.isniSelectBreakfast('<?php echo esc_js($code); ?>');">
                    Ajouter au séjour
                </button>
            </div>
            <?php endforeach; ?>
        </div>
    </section>

    <section id="a-savoir" style="padding:72px 24px;background:#f2e8df;">
        <div style="max-width:1280px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:36px;">
                <span style="font-family:'Permanent Marker',cursive;color:#f05a2d;">Informations pratiques</span>
                <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4rem);color:#06306b;margin:8px 0;">À SAVOIR AVANT VOTRE SÉJOUR</h2>
                <p style="max-width:680px;margin:0 auto;color:#4a5568;line-height:1.65;">Les tarifs ci-dessous reprennent le barème fourni. La disponibilité et la sortie surf sont à confirmer par la réception.</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px;">
                <article class="card-panel" style="padding:24px;"><span style="font-family:'Bebas Neue',sans-serif;color:#f05a2d;font-size:2rem;">01</span><h3 style="color:#06306b;margin:6px 0;">Chambres pour 1 à 4 personnes</h3><p style="color:#4a5568;line-height:1.6;">La résidence propose 29 chambres et appartements. Choisissez le tarif correspondant au nombre de voyageurs.</p></article>
                <article class="card-panel" style="padding:24px;"><span style="font-family:'Bebas Neue',sans-serif;color:#1f6f78;font-size:2rem;">02</span><h3 style="color:#06306b;margin:6px 0;">Tarifs par nuit</h3><p style="color:#4a5568;line-height:1.8;">Simple · 320 MAD<br>Double · 420 MAD<br>Triple · 480 MAD<br>Quadruple · 520 MAD</p></article>
                <article class="card-panel" style="padding:24px;"><span style="font-family:'Bebas Neue',sans-serif;color:#f05a2d;font-size:2rem;">03</span><h3 style="color:#06306b;margin:6px 0;">Petit-déjeuner en option</h3><p style="color:#4a5568;line-height:1.6;">Express · 30 DH ; Continental ou Beldi · 35 DH par personne et par jour.</p></article>
                <article class="card-panel" style="padding:24px;"><span style="font-family:'Bebas Neue',sans-serif;color:#06306b;font-size:2rem;">04</span><h3 style="color:#06306b;margin:6px 0;">Surf à Taghazout sur demande</h3><p style="color:#4a5568;line-height:1.6;">Transport, planche, combinaison, moniteur et déjeuner sont annoncés. Tarif et disponibilité à confirmer.</p></article>
            </div>
        </div>
    </section>

    <!-- FORMULAIRE DE DEMANDE DE RÉSERVATION -->
    <section id="reservation" style="padding:80px 24px;background:#f2e8df;">
        <div style="max-width:1100px;margin:0 auto;background:#ffffff;border-radius:24px;padding:48px 36px;box-shadow:0 15px 40px rgba(6,48,107,0.1);">
            <div style="text-align:center;margin-bottom:36px;">
                <span style="font-family:'Permanent Marker',cursive;color:#f05a2d;font-size:1.3rem;">Réservation Directe</span>
                <h2 style="font-family:'Bebas Neue',sans-serif;font-size:3rem;color:#06306b;margin-bottom:8px;">
                    COMPOSER VOTRE SÉJOUR
                </h2>
                <p style="color:#4a5568;">Choisissez vos dates, votre hébergement et vos options. Votre demande est enregistrée et transmise à la réception.</p>
            </div>

            <!-- Booking App Container handled by assets/booking.js -->
            <div id="isni-booking-app">
                <!-- JS mounts the date inputs and interactive booking form here -->
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>
`;

  const indexPhp = `<?php
/**
 * Fallback template
 */
get_header(); ?>
<main style="padding:48px 24px;max-width:1200px;margin:0 auto;">
    <h1><?php the_title(); ?></h1>
    <?php
    if (have_posts()) :
        while (have_posts()) : the_post();
            the_content();
        endwhile;
    endif;
    ?>
</main>
<?php get_footer(); ?>
`;

  const makeSurfLevelPage = (level: 'debutant' | 'intermediaire') => {
    const beginner = level === 'debutant';
    const title = beginner ? 'Surf débutant à Taghazout' : 'Surf intermédiaire à Taghazout';
    const headline = beginner ? 'DÉCOUVRIR LE SURF' : 'FAIRE ÉVOLUER SON SURF';
    const intro = beginner
      ? 'Vous n’avez jamais surfé ou souhaitez reprendre les bases ? Une sortie encadrée à Taghazout pour découvrir le surf à votre rythme.'
      : 'Vous avez déjà une expérience et souhaitez gagner en aisance ? Choisissez le parcours intermédiaire et partagez vos objectifs avec la réception.';
    const steps = beginner
      ? [['01','Prendre ses repères','Découvrir la planche, les consignes de sécurité et le briefing avant la session.'],['02','Apprendre les bases','Travailler la position sur la planche, la rame et le redressement avec le moniteur.'],['03','Se lancer dans les vagues','Découvrir les premières vagues adaptées au niveau et aux conditions du jour.']]
      : [['01','Évaluer son expérience','Décrire les vagues déjà surfées et les points que vous souhaitez améliorer.'],['02','Choisir un objectif','Travailler selon la session le placement, le timing, la rame ou la direction de la vague.'],['03','Progresser en confiance','Faire le point avec le moniteur sur les conditions et les objectifs de la session.']];
    const focus = beginner
      ? ['Sécurité et repères dans l’eau','Équilibre et position sur la planche','Rame et redressement','Découverte des premières vagues']
      : ['Placement et lecture des vagues','Timing et rame','Prise de vague et direction','Objectifs adaptés au niveau confirmé sur place'];
    const templateName = beginner ? 'Surf Débutant' : 'Surf Intermédiaire';
    return `<?php
/**
 * Template Name: ${templateName}
 * Template Post Type: page
 */
get_header(); ?>
<main style="background:#faf5f0;color:#06306b;">
<section style="position:relative;overflow:hidden;background:#06306b;color:white;min-height:530px;display:flex;align-items:center;">
<img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/surf_lesson_taghazout_1793212942727.jpg'); ?>" alt="Session de surf à Taghazout" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.38;">
<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(6,48,107,.96),rgba(6,48,107,.64),rgba(6,48,107,.15));"></div>
<div style="position:relative;z-index:1;max-width:1200px;width:100%;margin:0 auto;padding:72px 24px;">
<a href="<?php echo esc_url(home_url('/#activites')); ?>" style="color:#fff;text-decoration:none;font-weight:700;">← Retour aux activités</a>
<p style="font-family:'Permanent Marker',cursive;color:#f29acb;margin:42px 0 12px;text-transform:uppercase;letter-spacing:.14em;">Surf · Taghazout · ${beginner ? 'Débutant' : 'Intermédiaire'}</p>
<h1 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,9vw,8rem);line-height:.88;margin:0;max-width:850px;">${headline}</h1>
<p style="max-width:670px;font-size:1.2rem;line-height:1.7;color:rgba(255,255,255,.88);">${intro}</p>
<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:28px;"><span style="border:1px solid rgba(255,255,255,.4);border-radius:999px;padding:9px 15px;">Transport vers les spots</span><span style="border:1px solid rgba(255,255,255,.4);border-radius:999px;padding:9px 15px;">Planche & combinaison</span><span style="border:1px solid rgba(255,255,255,.4);border-radius:999px;padding:9px 15px;">Moniteur & déjeuner</span></div>
</div></section>
<section style="max-width:1200px;margin:0 auto;padding:72px 24px;">
<p style="font-family:'Permanent Marker',cursive;color:#f05a2d;">VOTRE PARCOURS</p><h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.8rem,5vw,4.5rem);margin:0 0 28px;">${beginner ? 'APPRENDRE À SON RYTHME' : 'GAGNER EN AISANCE SUR LES VAGUES'}</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;">
${steps.map(([number, label, description]) => `<article class="card-panel" style="padding:24px;transition:transform .25s,box-shadow .25s;"><span style="font-family:'Bebas Neue',sans-serif;color:#f05a2d;font-size:2.7rem;">${number}</span><h3 style="font-size:1.2rem;margin:8px 0;">${label}</h3><p style="color:#4a5568;line-height:1.65;">${description}</p></article>`).join('')}
</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px;margin-top:34px;">
<div style="background:#f2e8df;border-radius:24px;padding:30px;"><h3 style="font-family:'Bebas Neue',sans-serif;font-size:2rem;">POINTS À ABORDER</h3><ul style="line-height:2;">${focus.map(item => `<li>${item}</li>`).join('')}</ul></div>
<div style="background:#fff;border-radius:24px;padding:30px;box-shadow:0 10px 30px rgba(6,48,107,.08);"><h3 style="font-family:'Bebas Neue',sans-serif;font-size:2rem;">SORTIE SUR DEMANDE</h3><p style="line-height:1.7;color:#4a5568;">L’affiche ISNI annonce le transport vers les spots, la planche, la combinaison, un moniteur et le déjeuner. Le tarif, les horaires, le déroulement et la disponibilité sont à confirmer par la résidence.</p><a class="btn-primary" href="<?php echo esc_url(add_query_arg('isni_activity', 'surf-${level}', home_url('/'))); ?>#reservation">Ajouter à ma demande · Tarif à confirmer</a><p style="font-size:.82rem;color:#718096;margin-top:12px;">Le montant surf n’est pas inclus dans l’estimation en ligne.</p></div>
</div></section>
<section style="background:#fff;padding:72px 24px;"><div style="max-width:1200px;margin:0 auto;"><p style="font-family:'Permanent Marker',cursive;color:#f05a2d;">QUESTIONS FRÉQUENTES</p><h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.8rem,5vw,4.5rem);">AVANT DE PARTIR SURFER</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;">
<div class="card-panel" style="padding:24px;"><h3>Le matériel est-il inclus ?</h3><p style="color:#4a5568;line-height:1.6;">L’affiche indique planche et combinaison incluses. Les détails sont à confirmer avec la réception.</p></div>
<div class="card-panel" style="padding:24px;"><h3>Quel est le tarif ?</h3><p style="color:#4a5568;line-height:1.6;">Aucun tarif par niveau n’a été fourni. La réception confirmera le prix et la disponibilité.</p></div>
<div class="card-panel" style="padding:24px;"><h3>Le parcours est-il fixe ?</h3><p style="color:#4a5568;line-height:1.6;">Les points présentés sont des objectifs possibles, pas un programme garanti. Le contenu est à confirmer avec la résidence et le moniteur.</p></div>
</div><p style="margin-top:28px;"><a href="<?php echo esc_url(isni_get_surf_page_url('${beginner ? 'intermediaire' : 'debutant'}')); ?>" style="color:#1f6f78;font-weight:700;">Découvrir le niveau ${beginner ? 'intermédiaire' : 'débutant'} →</a></p></div></section>
</main>
<?php get_footer(); ?>`;
  };

  const surfBeginnerPhp = makeSurfLevelPage('debutant');
  const surfIntermediatePhp = makeSurfLevelPage('intermediaire');

  const bookingJs = `/**
 * Residence ISNI - Interactive Booking Calendar & Google Sheets Bridge
 * Vanilla JavaScript (Zero external dependencies)
 */

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('isni-booking-app');
    if (!container) return;

    const data = window.isniData || {
        ajaxUrl: '/wp-admin/admin-ajax.php',
        nonce: '',
        rooms: {
            simple: { name: 'Chambre simple · 1 personne', price: 320, capacity: 1 },
            double: { name: 'Chambre double · 2 personnes', price: 420, capacity: 2 },
            triple: { name: 'Chambre triple · 3 personnes', price: 480, capacity: 3 },
            quadruple: { name: 'Chambre quadruple · 4 personnes', price: 520, capacity: 4 }
        },
        breakfast: {
            none: { name: 'Sans petit-déjeuner', price: 0 },
            continental: { name: 'Continental', price: 35 },
            express: { name: 'Express', price: 30 },
            beldi: { name: 'Beldi (Traditionnel)', price: 35 }
        }
    };

    let selectedRoom = 'double';
    let checkInDate = '';
    let checkOutDate = '';
    let guests = 2;
    let selectedBreakfast = 'none';
    const activityLabels = {
        'surf-debutant': 'Surf · Débutant · Taghazout',
        'surf-intermediaire': 'Surf · Intermédiaire · Taghazout'
    };
    let selectedActivities = [];
    const requestedActivity = new URLSearchParams(window.location.search).get('isni_activity');
    if (activityLabels[requestedActivity]) selectedActivities = [requestedActivity];
    let guestName = '';
    let guestEmail = '';
    let guestPhone = '';
    let guestNotes = '';

    function localISODate(date) {
        return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    }

    function updateActivityUI() {
        Object.keys(activityLabels).forEach(function(code) {
            const checkbox = document.getElementById('isni-activity-' + code);
            if (checkbox) checkbox.checked = selectedActivities.includes(code);
        });
        const summary = document.getElementById('isni-activity-summary');
        if (summary) summary.textContent = selectedActivities.length
            ? selectedActivities.map(code => activityLabels[code] + ' · Tarif à confirmer').join(' ; ')
            : 'Aucune activité sélectionnée';
        updateWhatsAppLink();
    }

    function updateWhatsAppLink() {
        const link = document.getElementById('isni-whatsapp-link');
        if (!link) return;
        const dates = checkInDate && checkOutDate ? checkInDate + ' au ' + checkOutDate + ' (' + nightsBetween() + ' nuits)' : 'à préciser';
        const room = data.rooms[selectedRoom] || {};
        const breakfast = data.breakfast[selectedBreakfast] || { name: 'Sans petit-déjeuner', price: 0 };
        const nights = nightsBetween();
        const roomTotal = nights * (Number(room.price) || 0);
        const breakfastTotal = nights * (Number(breakfast.price) || 0) * guests;
        const total = roomTotal + breakfastTotal;
        const activityText = selectedActivities.length ? selectedActivities.map(code => activityLabels[code]).join(', ') + ' (tarif à confirmer)' : 'Aucune';
        const message = [
            'Bonjour Résidence ISNI Agadir ! Je souhaite envoyer cette demande de réservation :',
            'Hébergement : ' + (room.name || selectedRoom),
            'Dates : ' + dates,
            'Voyageurs : ' + guests,
            'Petit-déjeuner : ' + breakfast.name + ' (' + (Number(breakfast.price) || 0) + ' DH/personne/jour)',
            'Prix chambre : ' + roomTotal + ' MAD',
            'Prix petits-déjeuners : ' + breakfastTotal + ' MAD',
            'Activités : ' + activityText,
            'Total estimé hors activités : ' + total + ' MAD',
            'Nom : ' + (guestName || 'à compléter'),
            'Email : ' + (guestEmail || 'à compléter'),
            'Téléphone / WhatsApp : ' + (guestPhone || 'à compléter'),
            'Demandes particulières : ' + (guestNotes || 'aucune'),
            'Merci de me confirmer la disponibilité.'
        ].join('\\n');
        const phone = String(data.whatsapp || '+212 528 820 467').replace(/[^0-9]/g, '');
        link.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
    }

    function nightsBetween() {
        if (!checkInDate || !checkOutDate) return 0;
        const diff = Date.parse(checkOutDate + 'T00:00:00Z') - Date.parse(checkInDate + 'T00:00:00Z');
        return diff > 0 ? Math.round(diff / 86400000) : 0;
    }

    function calculateTotal() {
        if (!checkInDate || !checkOutDate) return 0;
        const d1 = Date.parse(checkInDate + 'T00:00:00Z');
        const d2 = Date.parse(checkOutDate + 'T00:00:00Z');
        const diffTime = d2 - d1;
        if (diffTime <= 0) return 0;
        const nights = Math.round(diffTime / 86400000);
        const rPrice = (data.rooms[selectedRoom] ? data.rooms[selectedRoom].price : 420);
        const bfPrice = (data.breakfast[selectedBreakfast] ? data.breakfast[selectedBreakfast].price : 0);
        return (nights * rPrice) + (nights * bfPrice * guests);
    }

    function render() {
        const existingName = document.getElementById('isni-name');
        if (existingName) guestName = existingName.value;
        const existingEmail = document.getElementById('isni-email');
        if (existingEmail) guestEmail = existingEmail.value;
        const existingPhone = document.getElementById('isni-phone');
        if (existingPhone) guestPhone = existingPhone.value;
        const existingNotes = document.getElementById('isni-notes');
        if (existingNotes) guestNotes = existingNotes.value;
        const total = calculateTotal();
        const dateDiff = (checkInDate && checkOutDate) ? Date.parse(checkOutDate + 'T00:00:00Z') - Date.parse(checkInDate + 'T00:00:00Z') : 0;
        const nights = dateDiff > 0 ? Math.round(dateDiff / 86400000) : 0;

        container.innerHTML = \`
            <form id="isni-booking-form" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
                <input type="text" name="website" style="display:none;" tabindex="-1" autocomplete="off">

                <div style="background:#f2e8df;padding:24px;border-radius:16px;">
                    <h4 style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:#06306b;margin-bottom:16px;">1. Dates & Chambre</h4>
                    
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-weight:600;font-size:0.85rem;margin-bottom:6px;">Type de Chambre</label>
                        <select id="isni-room-select" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:1rem;background:#fff;">
                            \${Object.keys(data.rooms).map(code => \`
                                <option value="\${code}" \${code === selectedRoom ? 'selected' : ''}>\${data.rooms[code].name} (\${data.rooms[code].price} MAD / nuit)</option>
                            \`).join('')}
                        </select>
                    </div>

                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                        <div>
                            <label style="display:block;font-weight:600;font-size:0.85rem;margin-bottom:6px;">Arrivée</label>
                            <input type="date" id="isni-checkin" value="\${checkInDate}" min="\${localISODate(new Date())}" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;" required>
                        </div>
                        <div>
                            <label style="display:block;font-weight:600;font-size:0.85rem;margin-bottom:6px;">Départ</label>
                            <input type="date" id="isni-checkout" value="\${checkOutDate}" min="\${checkInDate || localISODate(new Date())}" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;" required>
                        </div>
                    </div>

                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-weight:600;font-size:0.85rem;margin-bottom:6px;">Nombre de Personnes</label>
                        <select id="isni-guests-select" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:1rem;background:#fff;">
                            \${[1, 2, 3, 4].map(count => '<option value="' + count + '" ' + (guests === count ? 'selected' : '') + '>' + count + ' ' + (count === 1 ? 'Personne' : 'Personnes') + '</option>').join('')}
                        </select>
                    </div>

                    <div>
                        <label style="display:block;font-weight:600;font-size:0.85rem;margin-bottom:6px;">Formule Petit-Déjeuner</label>
                        <select id="isni-bf-select" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:1rem;background:#fff;">
                            <option value="none" \${selectedBreakfast === 'none' ? 'selected' : ''}>Sans petit-déjeuner</option>
                            <option value="beldi" \${selectedBreakfast === 'beldi' ? 'selected' : ''}>Beldi traditionnel (+35 DH / pers / jour)</option>
                            <option value="continental" \${selectedBreakfast === 'continental' ? 'selected' : ''}>Continental (+35 DH / pers / jour)</option>
                            <option value="express" \${selectedBreakfast === 'express' ? 'selected' : ''}>Express (+30 DH / pers / jour)</option>
                        </select>
                    </div>
                </div>

                <div style="background:#f2e8df;padding:24px;border-radius:16px;display:flex;flex-direction:column;justify-content:space-between;">
                    <div>
                        <h4 style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:#06306b;margin-bottom:16px;">2. Vos Coordonnées</h4>
                        
                        <div style="margin-bottom:12px;">
                            <input type="text" id="isni-name" value="\${escapeHtml(guestName)}" placeholder="Nom et Prénom *" required style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;">
                        </div>
                        <div style="margin-bottom:12px;">
                            <input type="email" id="isni-email" value="\${escapeHtml(guestEmail)}" placeholder="Adresse Email *" required style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;">
                        </div>
                        <div style="margin-bottom:12px;">
                            <input type="tel" id="isni-phone" value="\${escapeHtml(guestPhone)}" placeholder="Téléphone / WhatsApp *" required style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;">
                        </div>
                        <div style="margin-bottom:12px;">
                            <textarea id="isni-notes" rows="2" placeholder="Demandes particulières (cours de surf, heure d'arrivée...)" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;">\${escapeHtml(guestNotes)}</textarea>
                        </div>
                        <div style="margin:12px 0;padding:12px;background:#fff;border:1px solid #d8deea;border-radius:10px;">
                            <strong style="display:block;margin-bottom:8px;color:#06306b;">Activités surf sélectionnées</strong>
                            <label style="display:flex;gap:8px;align-items:flex-start;color:#06306b;font-size:.9rem;margin:8px 0;">
                                <input type="checkbox" id="isni-activity-surf-debutant" \${selectedActivities.includes('surf-debutant') ? 'checked' : ''}>
                                <span>Surf · Débutant · Taghazout — tarif à confirmer</span>
                            </label>
                            <label style="display:flex;gap:8px;align-items:flex-start;color:#06306b;font-size:.9rem;margin:8px 0;">
                                <input type="checkbox" id="isni-activity-surf-intermediaire" \${selectedActivities.includes('surf-intermediaire') ? 'checked' : ''}>
                                <span>Surf · Intermédiaire · Taghazout — tarif à confirmer</span>
                            </label>
                        </div>
                    </div>

                    <div style="border-top:2px dashed #06306b;padding-top:16px;margin-top:16px;">
                        <div style="margin-bottom:10px;color:#06306b;font-size:.85rem;"><strong>Activités choisies :</strong> <span id="isni-activity-summary"></span></div>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                            <span style="font-weight:600;color:#06306b;">Total estimé (\${nights} nuits, hors activités à confirmer) :</span>
                            <span style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#f05a2d;">\${total} MAD</span>
                        </div>
                        <button type="submit" id="isni-submit-btn" style="width:100%;background:#f05a2d;color:#fff;border:none;padding:14px;border-radius:9999px;font-weight:700;font-size:1rem;text-transform:uppercase;cursor:pointer;">
                            Envoyer ma demande de réservation
                        </button>
                        <a id="isni-whatsapp-link" href="#" target="_blank" rel="noopener noreferrer" style="display:block;margin-top:14px;text-align:center;color:#128c4a;font-size:.9rem;font-weight:700;">Ou envoyer le récapitulatif complet par WhatsApp</a>
                    </div>
                </div>
            </form>
            <div id="isni-feedback" style="margin-top:20px;display:none;padding:16px;border-radius:8px;"></div>
        \`;

        // Restore guest details after the form redraws and keep the selected activity visible.
        document.getElementById('isni-name').value = guestName;
        document.getElementById('isni-email').value = guestEmail;
        document.getElementById('isni-phone').value = guestPhone;
        updateActivityUI();
        ['isni-name', 'isni-email', 'isni-phone', 'isni-notes'].forEach(function(id) {
            document.getElementById(id).addEventListener('input', function(e) {
                if (id === 'isni-name') guestName = e.target.value;
                if (id === 'isni-email') guestEmail = e.target.value;
                if (id === 'isni-phone') guestPhone = e.target.value;
                if (id === 'isni-notes') guestNotes = e.target.value;
                updateWhatsAppLink();
            });
        });
        ['surf-debutant', 'surf-intermediaire'].forEach(function(code) {
            document.getElementById('isni-activity-' + code).addEventListener('change', function(e) {
                selectedActivities = e.target.checked
                    ? Array.from(new Set([...selectedActivities, code]))
                    : selectedActivities.filter(activity => activity !== code);
                updateActivityUI();
            });
        });

        // Wire event handlers
        document.getElementById('isni-room-select').addEventListener('change', function(e) {
            selectedRoom = e.target.value;
            guests = data.rooms[selectedRoom].capacity;
            render();
        });
        document.getElementById('isni-checkin').addEventListener('change', function(e) {
            checkInDate = e.target.value;
            render();
        });
        document.getElementById('isni-checkout').addEventListener('change', function(e) {
            checkOutDate = e.target.value;
            render();
        });
        document.getElementById('isni-guests-select').addEventListener('change', function(e) {
            guests = parseInt(e.target.value);
            const matchingRoom = Object.keys(data.rooms).find(code => data.rooms[code].capacity === guests);
            if (matchingRoom) selectedRoom = matchingRoom;
            render();
        });
        document.getElementById('isni-bf-select').addEventListener('change', function(e) {
            selectedBreakfast = e.target.value;
            render();
        });

        document.getElementById('isni-booking-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('isni-submit-btn');
            const feedback = document.getElementById('isni-feedback');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';

            const formData = new FormData();
            formData.append('action', 'isni_book');
            formData.append('nonce', data.nonce);
            formData.append('full_name', document.getElementById('isni-name').value);
            formData.append('email', document.getElementById('isni-email').value);
            formData.append('phone', document.getElementById('isni-phone').value);
            formData.append('room_type', selectedRoom);
            formData.append('check_in', checkInDate);
            formData.append('check_out', checkOutDate);
            formData.append('guests', guests);
            formData.append('breakfast', selectedBreakfast);
            formData.append('notes', document.getElementById('isni-notes').value);
            formData.append('activities', selectedActivities.map(code => activityLabels[code]).join(', '));
            formData.append('website', document.querySelector('input[name="website"]').value);

            fetch(data.ajaxUrl, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                feedback.style.display = 'block';
                if (response.success) {
                    feedback.style.background = '#d4edda';
                    feedback.style.color = '#155724';
                    feedback.innerHTML = '<strong>Demande enregistrée.</strong> ' + response.data.message + (response.data.sheetSyncWarning ? '<br><strong>Google Sheets :</strong> synchronisation non confirmée. Contactez la résidence pour vérifier votre demande.' : '');
                } else {
                    feedback.style.background = '#f8d7da';
                    feedback.style.color = '#721c24';
                    feedback.innerHTML = '<strong>Erreur :</strong> ' + (response.data ? response.data.message : 'Une erreur est survenue.');
                }
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer ma demande de réservation';
            })
            .catch(err => {
                feedback.style.display = 'block';
                feedback.style.background = '#f8d7da';
                feedback.style.color = '#721c24';
                feedback.innerHTML = 'Erreur réseau. Veuillez réessayer ou nous contacter par WhatsApp.';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer ma demande de réservation';
            });
        });
    }

    // Expose helpers for outside buttons
    window.isniSelectRoom = function(code) {
        selectedRoom = code;
        guests = data.rooms[code] ? data.rooms[code].capacity : guests;
        render();
        const el = document.getElementById('reservation');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    window.isniSelectBreakfast = function(code) {
        selectedBreakfast = code;
        render();
        const el = document.getElementById('reservation');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    window.isniSelectActivity = function(code) {
        if (!activityLabels[code]) return;
        selectedActivities = selectedActivities.includes(code)
            ? selectedActivities.filter(activity => activity !== code)
            : [...selectedActivities, code];
        updateActivityUI();
        const el = document.getElementById('reservation');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    render();
});
`;

  const googleAppsScript = `/**
 * Google Apps Script for Résidence ISNI Booking System
 * 
 * Instructions de déploiement :
 * 1. Ouvrez https://script.google.com/ et créez un nouveau projet
 * 2. Nommez le projet "ISNI Réservations Webhook"
 * 3. Remplacez tout le code par ce contenu
 * 4. Cliquez sur Déployer > Nouveau déploiement
 * 5. Sélectionnez le type : "Application Web"
 * 6. Description : "ISNI Booking Receiver"
 * 7. Exécuter en tant que : "Moi" (votre compte Google)
 * 8. Qui a accès : "Tout le monde" (Anyone)
 * 9. Cliquez sur Déployer et copiez l'URL de l'application Web (se termine par /exec)
 * 10. Collez cette URL dans WordPress (Réglages > Résidence) ou dans le panneau de test
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error("Impossible de verrouiller la feuille. Réessayez.");

  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);
    if (data.websiteHoneypot) {
      return ContentService.createTextOutput(JSON.stringify({ status: "ignored" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    if (!data.fullName || !data.email || !data.phone || !data.checkIn || !data.checkOut) {
      throw new Error("Champs obligatoires manquants.");
    }

    // Ouvrir le classeur actif ou créer l'onglet "Réservations"
    var ss = getIsniSpreadsheet_();

    var sheetName = "Réservations";
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      // En-têtes de colonnes
      sheet.appendRow([
        "Horodatage",
        "ID Réservation",
        "Nom Client",
        "Email",
        "Téléphone",
        "Chambre",
        "Date Arrivée",
        "Date Départ",
        "Nuits",
        "Personnes",
        "Formule Petit-Déj",
        "Total (MAD)",
        "Statut",
        "Notes / Demandes",
        "Activités souhaitées"
      ]);

      // Mise en forme des en-têtes
      var headerRange = sheet.getRange("A1:Q1");
      headerRange.setBackground("#06306b");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    [[15, "Activités souhaitées"], [16, "Prix chambre (MAD)"], [17, "Petit-déjeuner total (MAD)"]].forEach(function(header) {
      if (sheet.getRange(1, header[0]).getValue() !== header[1]) {
        sheet.getRange(1, header[0]).setValue(header[1]).setBackground("#06306b").setFontColor("#ffffff").setFontWeight("bold");
      }
    });

    // Évite les doublons lors d'une nouvelle tentative après un délai réseau.
    var bookingId = data.id || "ISNI-" + new Date().getTime();
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 2, sheet.getLastRow() - 1, 1)
      .createTextFinder(String(bookingId)).matchEntireCell(true).findNext()) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", id: bookingId, duplicate: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Ajouter la ligne de réservation
    sheet.appendRow([
      safeCell_(data.timestamp || new Date()),
      safeCell_(bookingId),
      safeCell_(data.fullName),
      safeCell_(data.email),
      safeCell_(data.phone),
      safeCell_(data.roomType || ""),
      safeCell_(data.checkIn),
      safeCell_(data.checkOut),
      data.nights || "",
      data.guests || 1,
      safeCell_(data.breakfast || "none"),
      data.totalPriceMAD || 0,
      safeCell_(data.status || "en_attente"),
      safeCell_(data.notes || ""),
      safeCell_(data.activities || ""),
      Number(data.roomPriceMAD) || 0,
      Number(data.breakfastPriceMAD) || 0
    ]);

    // Formatage auto de largeur
    sheet.autoResizeColumns(1, 17);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Réservation enregistrée dans Google Sheets avec succès",
      id: bookingId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// À lancer une fois dans l'éditeur Apps Script avant le déploiement.
function initializeIsniSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) ss = SpreadsheetApp.create("Résidence ISNI - Réservations");
  PropertiesService.getScriptProperties().setProperty("ISNI_SPREADSHEET_ID", ss.getId());
  Logger.log("Classeur ISNI prêt : " + ss.getUrl());
  return ss.getUrl();
}

function getIsniSpreadsheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) return ss;
  var id = PropertiesService.getScriptProperties().getProperty("ISNI_SPREADSHEET_ID");
  if (!id) throw new Error("Lancez initializeIsniSheet() une fois avant le déploiement.");
  return SpreadsheetApp.openById(id);
}

function safeCell_(value) {
  var text = String(value == null ? "" : value);
  return /^[=+@\\-\\t\\r]/.test(text) ? "'" + text : text;
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    message: "ISNI Google Apps Script Webhook est opérationnel."
  })).setMimeType(ContentService.MimeType.JSON);
}
`;

  const readmeMd = `# Thème WordPress Résidence ISNI & Synchronisation Google Sheets

Thème WordPress sur mesure développé pour l'Appart-Hôtel Résidence ISNI à Agadir (29 chambres).
Avenue Allal Ben Abdellah, Agadir, Maroc.

## Contenu de l'archive
- \`style.css\` : Déclaration du thème et styles inspirés de fr.desertsurfcamp.com (fond crème #f2e8df, orange #f05a2d, bleu marine #06306b).
- \`functions.php\` : Configuration WordPress 7.1.3 + PHP 8.1, menu Réglages > Résidence, CPT \`isni_booking\`, requêtes AJAX sécurisées (nonce + honeypot anti-spam), calcul de prix côté serveur.
- \`header.php\` & \`footer.php\` : En-tête et pied de page avec polices Archivo, Bebas Neue, Permanent Marker.
- \`front-page.php\` : Page d'accueil avec chambres, petit-déjeuner, activité surf et réservation.
- \`page-surf-debutant.php\` et \`page-surf-intermediaire.php\` : pages dédiées créées automatiquement à l’activation.
- \`index.php\` : Template de secours.
- \`assets/booking.js\` : Calendrier et formulaire de réservation interactif sans dépendance externe.
- \`google-apps-script.gs\` : Script Google Apps Script pour synchroniser automatiquement chaque réservation dans votre Google Sheet en temps réel.

## Installation sur WordPress (cPanel / WP Toolkit)
1. Dans votre panneau d'administration WordPress, allez dans **Apparence > Thèmes > Ajouter un thème > Téléverser un thème**.
2. Sélectionnez le fichier \`residence-isni-theme.zip\` et cliquez sur **Installer maintenant**.
3. Cliquez sur **Activer**.
4. Les pages **Surf Débutant** et **Surf Intermédiaire** sont créées à l’activation du thème.
5. Dans **Réglages > Résidence**, vérifiez les coordonnées préremplies et ajoutez l’URL de votre Google Sheet.
6. Créez une page nommée "Accueil" et dans **Réglages > Lecture**, choisissez "Une page statique" et sélectionnez "Accueil".

## Déploiement de Google Sheets
1. Rendez-vous sur https://script.google.com/
2. Créez un nouveau projet et collez le contenu de \`google-apps-script.gs\`.
3. Sélectionnez \`initializeIsniSheet\`, cliquez sur **Exécuter** et autorisez l'accès à Google Sheets. Copiez l'URL indiquée dans le journal d'exécution. Cette étape mémorise le classeur unique utilisé par les réservations.
4. Cliquez sur Déployer > Nouveau déploiement > Application Web, choisissez **Exécuter en tant que : Moi** et définissez l'accès sur **Tout le monde**.
5. Copiez l'URL qui se termine par \`/exec\` et collez-la dans Réglages > Résidence dans votre admin WordPress.
6. Le thème attend la réponse de Google Apps Script et affiche un avertissement si l’écriture n’est pas confirmée. Les demandes restent aussi enregistrées dans WordPress ; vérifiez une ligne réelle dans l’onglet Réservations après un essai.
`;

  return [
    { name: 'style.css', content: styleCss, description: 'Fichier style principal du thème WP' },
    { name: 'functions.php', content: functionsPhp, description: 'Logique backend, CPT, AJAX & Réglages' },
    { name: 'header.php', content: headerPhp, description: 'En-tête et navigation' },
    { name: 'footer.php', content: footerPhp, description: 'Pied de page et coordonnées' },
    { name: 'front-page.php', content: frontPagePhp, description: 'Page d’accueil avec toutes les sections' },
    { name: 'page-surf-debutant.php', content: surfBeginnerPhp, description: 'Page surf niveau débutant' },
    { name: 'page-surf-intermediaire.php', content: surfIntermediatePhp, description: 'Page surf niveau intermédiaire' },
    { name: 'index.php', content: indexPhp, description: 'Fichier index de secours' },
    { name: 'assets/booking.js', content: bookingJs, description: 'Script calendrier de réservation' },
    { name: 'google-apps-script.gs', content: googleAppsScript, description: 'Script Google Sheet Web App' },
    { name: 'README.md', content: readmeMd, description: 'Guide d’installation cPanel & WP Toolkit' }
  ];
}

export async function generateWordpressThemeZip(): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder('residence-isni-theme');

  const files = getWordpressThemeFiles();
  files.forEach(f => {
    folder?.file(f.name, f.content);
  });

  const assetPaths = [
    'assets/breakfast-menu.webp',
    'assets/images/surf_lesson_taghazout_1793212942727.jpg',
    'assets/images/isni/living-room.jpg',
    'assets/images/isni/kitchenette.jpg',
    'assets/images/isni/twin-bedroom.jpg',
    'assets/images/isni/family-suite.jpg',
    'assets/images/isni/dining-room.jpg',
    'assets/images/isni/balcony.jpg'
  ];
  await Promise.all(assetPaths.map(async (path) => {
    const response = await fetch(`/${path}`);
    if (!response.ok) throw new Error(`Impossible d’inclure le visuel ${path} dans le thème WordPress.`);
    folder?.file(path, await response.blob());
  }));

  return await zip.generateAsync({ type: 'blob' });
}

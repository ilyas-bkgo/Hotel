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
        'rooms'     => isni_get_rooms(),
        'breakfast' => isni_get_breakfast()
    ));
}
add_action('wp_enqueue_scripts', 'isni_enqueue_scripts');

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
                    <td><input type="text" name="isni_phone" value="<?php echo esc_attr(get_option('isni_phone', '+212 5 28 84 21 00')); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">WhatsApp</th>
                    <td><input type="text" name="isni_whatsapp" value="<?php echo esc_attr(get_option('isni_whatsapp', '+212 6 61 24 55 88')); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">Email de réception</th>
                    <td><input type="email" name="isni_email" value="<?php echo esc_attr(get_option('isni_email', get_bloginfo('admin_email'))); ?>" class="regular-text"></td>
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
                    <th scope="row">Chambres (code|Nom|quantité|prix MAD|description)</th>
                    <td>
                        <textarea name="isni_rooms_data" rows="5" class="large-text"><?php echo esc_textarea(get_option('isni_rooms_data', "standard|Chambre Standard|15|450|Chambre lumineuse idéale pour surfeurs et couples\nconfort|Chambre Confort|10|600|Plus spacieuse avec balcon vue ville et salon\nsuite|Suite Appart-Hôtel|4|900|Suite avec grand salon marocain et kitchenette")); ?></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Activités (Nom|Prix|Description)</th>
                    <td>
                        <textarea name="isni_activities_data" rows="5" class="large-text"><?php echo esc_textarea(get_option('isni_activities_data', "Cours de Surf & Coaching|350 DH (Sur demande)|Cours 2h + free surf avec matériel fourni\nExcursion Petit Sahara|250 DH (25 €)|4x4 dans les dunes se jetant dans l'océan\nCoaching Surfskate|150 DH (15 €)|Perfectionnement virages sur la promenade\nParadise Valley Randonnée|200 DH (20 €)|Baignade dans les vasques turquoise de l'Atlas")); ?></textarea>
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
    $raw = get_option('isni_rooms_data', "standard|Chambre Standard|15|450|Chambre lumineuse\nconfort|Chambre Confort|10|600|Spacieuse avec balcon\nsuite|Suite Appart-Hôtel|4|900|Suite complète");
    $lines = explode("\n", trim($raw));
    $rooms = array();
    foreach ($lines as $line) {
        $parts = explode('|', trim($line));
        if (count($parts) >= 5) {
            $rooms[$parts[0]] = array(
                'code'        => $parts[0],
                'name'        => $parts[1],
                'quantity'    => intval($parts[2]),
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
    $room_code = sanitize_text_field($_GET['room'] ?? 'standard');
    $rooms = isni_get_rooms();
    $capacity = isset($rooms[$room_code]) ? $rooms[$room_code]['quantity'] : 15;

    $query = new WP_Query(array(
        'post_type'      => 'isni_booking',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'meta_query'     => array(
            array('key' => '_isni_room', 'value' => $room_code),
            array('key' => '_isni_status', 'value' => 'annulee', 'compare' => '!=')
        )
    ));

    $booked_dates = array();
    while ($query->have_posts()) {
        $query->the_post();
        $in = get_post_meta(get_the_ID(), '_isni_check_in', true);
        $out = get_post_meta(get_the_ID(), '_isni_check_out', true);
        if ($in && $out) {
            $curr = strtotime($in);
            $end = strtotime($out);
            while ($curr < $end) {
                $d = date('Y-m-d', $curr);
                $booked_dates[$d] = ($booked_dates[$d] ?? 0) + 1;
                $curr = strtotime('+1 day', $curr);
            }
        }
    }
    wp_reset_postdata();

    $fully_booked = array();
    foreach ($booked_dates as $date => $cnt) {
        if ($cnt >= $capacity) {
            $fully_booked[] = $date;
        }
    }

    wp_send_json_success(array(
        'room' => $room_code,
        'fullyBookedDates' => $fully_booked
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
    $room    = sanitize_text_field($_POST['room_type'] ?? 'standard');
    $check_in= sanitize_text_field($_POST['check_in'] ?? '');
    $check_out= sanitize_text_field($_POST['check_out'] ?? '');
    $guests  = max(1, intval($_POST['guests'] ?? 1));
    $bf_code = sanitize_text_field($_POST['breakfast'] ?? 'none');
    $notes   = sanitize_textarea_field($_POST['notes'] ?? '');

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
    $room_price_night = isset($rooms[$room]) ? $rooms[$room]['price'] : 450;
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

    // Send email to admin
    $admin_email = get_option('isni_email', get_bloginfo('admin_email'));
    $subject = "Nouvelle demande de réservation Résidence ISNI - " . $name;
    $body = "Nouvelle réservation reçue :\\n\\n"
          . "Nom : $name\\n"
          . "Email : $email\\n"
          . "Téléphone : $phone\\n"
          . "Chambre : $room\\n"
          . "Dates : du $check_in au $check_out ($nights nuits)\\n"
          . "Personnes : $guests\\n"
          . "Formule Petit-déjeuner : $bf_code\\n"
          . "Total estimé : $total MAD\\n"
          . "Notes : $notes\\n\\n"
          . "Gérer la réservation : " . admin_url('post.php?post=' . $post_id . '&action=edit');
    wp_mail($admin_email, $subject, $body);

    // Sync to Google Sheet via Google Apps Script Web App URL
    $sheet_url = get_option('isni_sheet_url', '');
    if (!empty($sheet_url)) {
        $sheet_payload = array(
            'id'            => 'ISNI-' . $post_id,
            'timestamp'     => current_time('mysql'),
            'fullName'      => $name,
            'email'         => $email,
            'phone'         => $phone,
            'roomType'      => $room,
            'checkIn'       => $check_in,
            'checkOut'      => $check_out,
            'nights'        => $nights,
            'guests'        => $guests,
            'breakfast'     => $bf_code,
            'totalPriceMAD' => $total,
            'status'        => 'en_attente',
            'notes'         => $notes
        );

        wp_remote_post($sheet_url, array(
            'headers'     => array('Content-Type' => 'application/json; charset=utf-8'),
            'body'        => wp_json_encode($sheet_payload),
            'method'      => 'POST',
            'data_format' => 'body',
            'timeout'     => 15,
            'blocking'    => false // Asynchronous so user is not kept waiting
        ));
    }

    wp_send_json_success(array(
        'bookingId' => 'ISNI-' . $post_id,
        'message'   => 'Votre demande de réservation a bien été reçue ! Notre équipe vous confirmera la disponibilité sous 2 heures.',
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
            <a href="#pourquoi" style="color:#06306b;text-decoration:none;font-weight:600;font-size:0.95rem;">Pourquoi</a>
            <a href="#chambres" style="color:#06306b;text-decoration:none;font-weight:600;font-size:0.95rem;">Chambres</a>
            <a href="#activites" style="color:#06306b;text-decoration:none;font-weight:600;font-size:0.95rem;">Activités</a>
            <a href="#petit-dejeuner" style="color:#06306b;text-decoration:none;font-weight:600;font-size:0.95rem;">Petit-Déjeuner</a>
            <a href="#a-savoir" style="color:#06306b;text-decoration:none;font-weight:600;font-size:0.95rem;">À Savoir</a>
        </nav>

        <div>
            <a href="#reservation" class="btn-primary" style="padding:10px 22px;font-size:0.9rem;">Réserver</a>
        </div>
    </div>
</header>
`;

  const footerPhp = `<footer style="background:#06306b;color:#f2e8df;padding:64px 24px 32px;margin-top:64px;">
    <div style="max-width:1440px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:48px;">
        <div>
            <h3 style="font-family:'Bebas Neue',sans-serif;font-size:2.4rem;color:#ffffff;letter-spacing:0.05em;margin-bottom:12px;">
                RÉSIDENCE ISNI
            </h3>
            <p style="color:#cfe5d8;max-width:320px;margin-bottom:20px;font-size:0.95rem;">
                Appart-Hôtel de charme et camp surf au cœur d'Agadir. 29 chambres chaleureuses pour vivre le Maroc authentique entre vagues et soleil.
            </p>
            <p style="color:#f29acb;font-weight:700;">Avenue Allal Ben Abdellah, Agadir 80000</p>
        </div>

        <div>
            <h4 style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:#f05a2d;letter-spacing:0.05em;margin-bottom:16px;">
                CONTACT & WHATSAPP
            </h4>
            <p style="margin-bottom:8px;">Téléphone : <a href="tel:<?php echo esc_attr(get_option('isni_phone', '+212528842100')); ?>" style="color:#ffffff;text-decoration:none;"><?php echo esc_html(get_option('isni_phone', '+212 5 28 84 21 00')); ?></a></p>
            <p style="margin-bottom:8px;">WhatsApp : <a href="https://wa.me/<?php echo esc_attr(str_replace(array(' ','+'), '', get_option('isni_whatsapp', '212661245588'))); ?>" style="color:#ffffff;text-decoration:none;"><?php echo esc_html(get_option('isni_whatsapp', '+212 6 61 24 55 88')); ?></a></p>
            <p style="margin-bottom:8px;">Email : <a href="mailto:<?php echo esc_attr(get_option('isni_email', 'contact@residence-isni.ma')); ?>" style="color:#ffffff;text-decoration:none;"><?php echo esc_html(get_option('isni_email', 'contact@residence-isni.ma')); ?></a></p>
        </div>

        <div>
            <h4 style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:#f05a2d;letter-spacing:0.05em;margin-bottom:16px;">
                INFOS PRATIQUES
            </h4>
            <p style="color:#cfe5d8;margin-bottom:8px;">• Check-in dès 14h00 / Check-out 12h00</p>
            <p style="color:#cfe5d8;margin-bottom:8px;">• Local à planches sécurisé & rinçage</p>
            <p style="color:#cfe5d8;margin-bottom:8px;">• Navettes Taghazout, Anza & Imsouane</p>
            <p style="color:#cfe5d8;margin-bottom:8px;">• Petit-déjeuner servi dès 07h30</p>
        </div>
    </div>

    <div style="max-width:1440px;margin:48px auto 0;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;font-size:0.85rem;color:#cfe5d8;">
        <p>&copy; <?php echo date('Y'); ?> Résidence ISNI · Appart-Hôtel Agadir. Tous droits réservés.</p>
        <p>Inspiré par le lifestyle surf marocain</p>
    </div>
</footer>

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
            DESERT SURF CAMP
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
                    29 chambres et suites chaleureuses au cœur d'Agadir sur l'Avenue Allal Ben Abdellah. Petit-déjeuner gourmand, sessions de surf à Taghazout et excursions désert.
                </p>
                <div style="display:flex;gap:16px;flex-wrap:wrap;">
                    <a href="#reservation" class="btn-primary">Réserver mon séjour</a>
                    <a href="#chambres" style="display:inline-block;padding:14px 28px;border-radius:9999px;border:2px solid #06306b;color:#06306b;font-weight:700;text-transform:uppercase;text-decoration:none;">Voir les chambres</a>
                </div>
            </div>

            <div style="border-radius:24px;overflow:hidden;box-shadow:0 20px 40px rgba(6,48,107,0.12);transform:rotate(1deg);border:4px solid #ffffff;">
                <img src="<?php echo esc_url(content_url('/uploads/2026/07/backgroud-1.jpg')); ?>" alt="Résidence ISNI Surf Camp Rooftop" style="width:100%;height:auto;display:block;min-height:380px;object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80'">
            </div>
        </div>
    </section>

    <!-- TICKER STRIP -->
    <div style="background:#06306b;color:#f2e8df;padding:16px 0;overflow:hidden;white-space:nowrap;font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:0.1em;">
        <div style="display:inline-block;animation:scrollText 25s linear infinite;">
            29 CHAMBRES DE CHARME · SURF GUIDING TAGHAZOUT · PETIT-DÉJEUNER MAISON · EXCURSIONS PETIT SAHARA · VIBES 100% MAROCAINES · ROOFTOP CHILL & YOGA ·
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
                <p style="color:#4a5568;">Sur l'Avenue Allal Ben Abdellah, proche de toutes les commodités, à 5 min de la corniche et des départs surf.</p>
            </div>
            <div class="card-panel" style="padding:32px;background:#ffffff;">
                <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#f29acb;">02</div>
                <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:8px;">Ambiance Surf & Bohème</h3>
                <p style="color:#4a5568;">Râtelier sécurisé pour planches, rooftop convivial pour échanger vos meilleures vagues du jour.</p>
            </div>
            <div class="card-panel" style="padding:32px;background:#ffffff;">
                <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#1f6f78;">03</div>
                <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:8px;">Petit-Déjeuner Beldi & Frais</h3>
                <p style="color:#4a5568;">Formules Continental, Express ou Beldi avec msemen chaud et thé à la menthe pour bien démarrer.</p>
            </div>
            <div class="card-panel" style="padding:32px;background:#ffffff;">
                <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#06306b;">04</div>
                <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:8px;">Excursions Océan & Dunes</h3>
                <p style="color:#4a5568;">Coaching surf à Taghazout, session 4x4 au Petit Sahara et rando à Paradise Valley organisées pour vous.</p>
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
                'standard' => content_url('/uploads/2026/06/chambre-standard.jpg'),
                'confort'  => content_url('/uploads/2026/06/chambre-confort.jpg'),
                'suite'    => content_url('/uploads/2026/06/suite.jpg')
            );
            $idx = 0;
            foreach ($rooms as $code => $r):
                $reverse = ($idx % 2 === 1);
            ?>
            <div class="card-panel" style="margin-bottom:40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));overflow:hidden;">
                <div style="<?php echo $reverse ? 'order:2;' : ''; ?>min-height:340px;background:#e8d9cc;">
                    <img src="<?php echo esc_url($room_images[$code] ?? ''); ?>" alt="<?php echo esc_attr($r['name']); ?>" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.src='https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'">
                </div>
                <div style="padding:48px 36px;display:flex;flex-direction:column;justify-content:center;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                        <span style="font-size:0.85rem;font-weight:700;color:#f05a2d;text-transform:uppercase;"><?php echo esc_html($r['quantity']); ?> Chambres disponibles</span>
                        <span style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#06306b;"><?php echo esc_html($r['price']); ?> MAD <span style="font-size:1rem;font-family:sans-serif;font-weight:normal;">/ nuit</span></span>
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

    <!-- SECTION CALENDRIER & RÉSERVATION -->
    <section id="reservation" style="padding:80px 24px;background:#f2e8df;">
        <div style="max-width:1100px;margin:0 auto;background:#ffffff;border-radius:24px;padding:48px 36px;box-shadow:0 15px 40px rgba(6,48,107,0.1);">
            <div style="text-align:center;margin-bottom:36px;">
                <span style="font-family:'Permanent Marker',cursive;color:#f05a2d;font-size:1.3rem;">Réservation Directe</span>
                <h2 style="font-family:'Bebas Neue',sans-serif;font-size:3rem;color:#06306b;margin-bottom:8px;">
                    CALENDRIER & DISPONIBILITÉS
                </h2>
                <p style="color:#4a5568;">Sélectionnez vos dates, votre chambre et votre petit-déjeuner. Synchronisation directe avec Google Sheet.</p>
            </div>

            <!-- Booking App Container handled by assets/booking.js -->
            <div id="isni-booking-app">
                <!-- JS will mount calendar and interactive booking form here -->
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
            standard: { name: 'Chambre Standard', price: 450, quantity: 15 },
            confort: { name: 'Chambre Confort', price: 600, quantity: 10 },
            suite: { name: 'Suite Appart-Hôtel', price: 900, quantity: 4 }
        },
        breakfast: {
            none: { name: 'Sans petit-déjeuner', price: 0 },
            continental: { name: 'Continental', price: 35 },
            express: { name: 'Express', price: 30 },
            beldi: { name: 'Beldi (Traditionnel)', price: 35 }
        }
    };

    let selectedRoom = 'standard';
    let checkInDate = '';
    let checkOutDate = '';
    let guests = 1;
    let selectedBreakfast = 'beldi';

    function calculateTotal() {
        if (!checkInDate || !checkOutDate) return 0;
        const d1 = new Date(checkInDate);
        const d2 = new Date(checkOutDate);
        const diffTime = d2 - d1;
        const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
        const rPrice = (data.rooms[selectedRoom] ? data.rooms[selectedRoom].price : 450);
        const bfPrice = (data.breakfast[selectedBreakfast] ? data.breakfast[selectedBreakfast].price : 0);
        return (nights * rPrice) + (nights * bfPrice * guests);
    }

    function render() {
        const total = calculateTotal();
        const nights = (checkInDate && checkOutDate) 
            ? Math.max(1, Math.round((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)))
            : 0;

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
                            <input type="date" id="isni-checkin" value="\${checkInDate}" min="\${new Date().toISOString().split('T')[0]}" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;" required>
                        </div>
                        <div>
                            <label style="display:block;font-weight:600;font-size:0.85rem;margin-bottom:6px;">Départ</label>
                            <input type="date" id="isni-checkout" value="\${checkOutDate}" min="\${checkInDate || new Date().toISOString().split('T')[0]}" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;" required>
                        </div>
                    </div>

                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-weight:600;font-size:0.85rem;margin-bottom:6px;">Nombre de Personnes</label>
                        <select id="isni-guests-select" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:1rem;background:#fff;">
                            <option value="1" \${guests === 1 ? 'selected' : ''}>1 Personne</option>
                            <option value="2" \${guests === 2 ? 'selected' : ''}>2 Personnes</option>
                            <option value="3" \${guests === 3 ? 'selected' : ''}>3 Personnes</option>
                            <option value="4" \${guests === 4 ? 'selected' : ''}>4 Personnes</option>
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
                            <input type="text" id="isni-name" placeholder="Nom et Prénom *" required style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;">
                        </div>
                        <div style="margin-bottom:12px;">
                            <input type="email" id="isni-email" placeholder="Adresse Email *" required style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;">
                        </div>
                        <div style="margin-bottom:12px;">
                            <input type="tel" id="isni-phone" placeholder="Téléphone / WhatsApp *" required style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;">
                        </div>
                        <div style="margin-bottom:12px;">
                            <textarea id="isni-notes" rows="2" placeholder="Demandes particulières (cours de surf, heure d'arrivée...)" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:0.95rem;background:#fff;"></textarea>
                        </div>
                    </div>

                    <div style="border-top:2px dashed #06306b;padding-top:16px;margin-top:16px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                            <span style="font-weight:600;color:#06306b;">Total estimé (\${nights} nuits) :</span>
                            <span style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#f05a2d;">\${total} MAD</span>
                        </div>
                        <button type="submit" id="isni-submit-btn" style="width:100%;background:#f05a2d;color:#fff;border:none;padding:14px;border-radius:9999px;font-weight:700;font-size:1rem;text-transform:uppercase;cursor:pointer;">
                            Envoyer ma demande de réservation
                        </button>
                    </div>
                </div>
            </form>
            <div id="isni-feedback" style="margin-top:20px;display:none;padding:16px;border-radius:8px;"></div>
        \`;

        // Wire event handlers
        document.getElementById('isni-room-select').addEventListener('change', function(e) {
            selectedRoom = e.target.value;
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
                    feedback.innerHTML = '<strong>Succès !</strong> ' + response.data.message;
                    document.getElementById('isni-booking-form').reset();
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

    // Set default dates (tomorrow to +3 days)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const in3Days = new Date();
    in3Days.setDate(in3Days.getDate() + 4);
    checkInDate = tomorrow.toISOString().split('T')[0];
    checkOutDate = in3Days.toISOString().split('T')[0];

    // Expose helpers for outside buttons
    window.isniSelectRoom = function(code) {
        selectedRoom = code;
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
  lock.tryLock(10000);

  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);

    // Ouvrir le classeur actif ou créer l'onglet "Réservations"
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      // Si exécuté hors d'une feuille existante, créer une feuille dédiée
      ss = SpreadsheetApp.create("Résidence ISNI - Réservations");
    }

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
        "Notes / Demandes"
      ]);

      // Mise en forme des en-têtes
      var headerRange = sheet.getRange("A1:N1");
      headerRange.setBackground("#06306b");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Ajouter la ligne de réservation
    sheet.appendRow([
      data.timestamp || new Date(),
      data.id || "ISNI-" + new Date().getTime(),
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.roomType || "",
      data.checkIn || "",
      data.checkOut || "",
      data.nights || "",
      data.guests || 1,
      data.breakfast || "none",
      data.totalPriceMAD || 0,
      data.status || "en_attente",
      data.notes || ""
    ]);

    // Formatage auto de largeur
    sheet.autoResizeColumns(1, 14);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Réservation enregistrée dans Google Sheets avec succès",
      id: data.id
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
- \`front-page.php\` : Page d'accueil complète (Hero, bandeau animé, pourquoi, panneaux chambres 50/50, activités surf & désert, menu petit-déjeuner avec les 3 formules, calendrier).
- \`index.php\` : Template de secours.
- \`assets/booking.js\` : Calendrier et formulaire de réservation interactif sans dépendance externe.
- \`google-apps-script.gs\` : Script Google Apps Script pour synchroniser automatiquement chaque réservation dans votre Google Sheet en temps réel.

## Installation sur WordPress (cPanel / WP Toolkit)
1. Dans votre panneau d'administration WordPress, allez dans **Apparence > Thèmes > Ajouter un thème > Téléverser un thème**.
2. Sélectionnez le fichier \`residence-isni-theme.zip\` et cliquez sur **Installer maintenant**.
3. Cliquez sur **Activer**.
4. Rendez-vous dans **Réglages > Résidence** pour configurer vos coordonnées, votre numéro WhatsApp et l'URL de votre Google Sheet.
5. Créez une page nommée "Accueil" et dans **Réglages > Lecture**, choisissez "Une page statique" et sélectionnez "Accueil".

## Déploiement de Google Sheets
1. Rendez-vous sur https://script.google.com/
2. Créez un nouveau projet et collez le contenu de \`google-apps-script.gs\`.
3. Cliquez sur Déployer > Nouveau déploiement > Application Web.
4. Définissez "Qui a accès" sur "Tout le monde" (Anyone).
5. Copiez l'URL de la Web App et collez-la dans Réglages > Résidence dans votre admin WordPress.
`;

  return [
    { name: 'style.css', content: styleCss, description: 'Fichier style principal du thème WP' },
    { name: 'functions.php', content: functionsPhp, description: 'Logique backend, CPT, AJAX & Réglages' },
    { name: 'header.php', content: headerPhp, description: 'En-tête et navigation' },
    { name: 'footer.php', content: footerPhp, description: 'Pied de page et coordonnées' },
    { name: 'front-page.php', content: frontPagePhp, description: 'Page d’accueil avec toutes les sections' },
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

  return await zip.generateAsync({ type: 'blob' });
}

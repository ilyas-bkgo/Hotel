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
Description: Thème WordPress pour Résidence ISNI à Agadir.
Version: 1.1.0
Requires at least: 6.0
Tested up to: 7.1.3
Requires PHP: 8.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: residence-isni
*/
`;

  const functionsPhp = `<?php
/**
 * Residence ISNI Theme Functions & Definitions
 * WordPress 7.1.3 & PHP 8.1+ Compatible
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ISNI_VERSION', '1.1.0');

// 1. Enqueue Scripts, Styles & Fonts
function isni_enqueue_scripts() {
    if (!is_front_page() && !is_page_template('page-surf-debutant.php') && !is_page_template('page-surf-intermediaire.php')) {
        return;
    }
    // Google Fonts
    wp_enqueue_style(
        'isni-google-fonts',
        'https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Bebas+Neue&family=Permanent+Marker&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sedgwick+Ave+Display&display=swap',
        array(),
        null
    );

    // Main Theme Stylesheet
    wp_enqueue_style('isni-style', get_stylesheet_uri(), array(), ISNI_VERSION);

    wp_enqueue_style('isni-app', get_template_directory_uri() . '/assets/theme-app/isni-app.css', array('isni-style'), ISNI_VERSION);
    wp_enqueue_script('isni-app', get_template_directory_uri() . '/assets/theme-app/isni-app.js', array(), ISNI_VERSION, true);

    // Localize Data for AJAX
    wp_localize_script('isni-app', 'isniData', array(
        'ajaxUrl'   => admin_url('admin-ajax.php'),
        'nonce'     => wp_create_nonce('isni_booking_nonce'),
        'sheetUrl'  => get_option('isni_sheet_url', ''),
        'themeUri'  => get_template_directory_uri(),
        'homeUrl'   => home_url('/'),
        'whatsapp'  => get_option('isni_whatsapp', '+212 528 820 467'),
        'rooms'     => isni_get_rooms(),
        'breakfast' => isni_get_breakfast()
    ));
}
add_action('wp_enqueue_scripts', 'isni_enqueue_scripts');
function isni_app_module_tag($tag, $handle, $src) {
    if ($handle !== 'isni-app') return $tag;
    return '<script type="module" src="' . esc_url($src) . '" id="isni-app-js"></script>';
}
add_filter('script_loader_tag', 'isni_app_module_tag', 10, 3);

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
<html <?php language_attributes(); ?>><head>
<meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Résidence ISNI, appart-hôtel à Agadir. Chambres, petit-déjeuner et activités surf.">
<?php wp_head(); ?></head><body <?php body_class(); ?>><?php wp_body_open(); ?>`;

  const footerPhp = `<?php wp_footer(); ?></body></html>`;

  const frontPagePhp = `<?php get_header(); ?><div id="root"></div><?php get_footer(); ?>`;

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
    const templateName = level === 'debutant' ? 'Surf Débutant' : 'Surf Intermédiaire';
    return `<?php
/**
 * Template Name: ${templateName}
 * Template Post Type: page
 */
get_header(); ?><div id="root"></div><?php get_footer(); ?>`;
  };

  const surfBeginnerPhp = makeSurfLevelPage('debutant');
  const surfIntermediatePhp = makeSurfLevelPage('intermediaire');

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
- \`header.php\` & \`footer.php\` : Coquille WordPress qui monte la même application React que le site local.
- \`assets/theme-app/isni-app.js\` et \`isni-app.css\` : application compilée partagée, pour conserver le même contenu, les mêmes styles et interactions.
- \`front-page.php\` : Monte l’application React sur l’accueil.
- \`page-surf-debutant.php\` et \`page-surf-intermediaire.php\` : pages dédiées créées automatiquement à l’activation.
- \`index.php\` : Template de secours.
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
    'assets/images/isni/balcony.jpg',
    'assets/theme-app/isni-app.js',
    'assets/theme-app/isni-app.css'
  ];
  await Promise.all(assetPaths.map(async (path) => {
    const response = await fetch(`/${path}`);
    if (!response.ok) throw new Error(`Impossible d’inclure le visuel ${path} dans le thème WordPress.`);
    folder?.file(path, await response.blob());
  }));

  return await zip.generateAsync({ type: 'blob' });
}

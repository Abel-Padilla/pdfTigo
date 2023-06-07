$(document).ready(function () {
    Nf.ready(function () {
        //var report_id = "SITEINVENTORY20220315000001";
        var report_id = U.getUrlParameter("report_id");
        var record_info = get_summary_info(report_id);
        var infrastructure_form = record_info[0];
        var energy_form = record_info[1];
        var meter_list = energy_form.meters;
        var physical_security_form = record_info[2];
        var physical_security_photos = ["panoramic_facade_tower", "enclosure_photo", "lock_photo"];
        var tower_form = record_info[3];
        var tigo_tower_elements = tower_form.tower_elements.filter(n => n.tower_element_owner == "Tigo");
        var other_tower_elements = tower_form.tower_elements.filter(n => n.tower_element_owner == "Otro");
        var rack_form = record_info[4];
        var tigo_cabinets = rack_form.cabinets.filter(n => n.cabinet_operator == "Tigo");
        var other_cabinets = rack_form.cabinets.filter(n => n.cabinet_operator == "Otro");

        //Define PDF style
        var content = "";

        //Define tables
        var summary_table = "";
        var infrastructure_table = "";
        var energy_table = "";
        var meter_table = "";
        var physical_security_table = "";
        var physical_security_photo_table = "";
        var tower_table = "";
        var tower_table_tigo_elements = "";
        var tower_table_other_elements = "";
        var rack_table = "";
        var tigo_cabinets_table = "";
        var other_cabinets_table = "";

        //Define images for summary table
        var hrefStr = location.href;
        var contextStr = hrefStr.substring(0, hrefStr.indexOf("/app"));
        var tigolog = "/adc-static/imagemgt/images/" + window.tenantId + "/oc_ehs/site_inventory_research/report/tigologov2.png";
        var huaweilog = "/adc-static/imagemgt/images/" + window.tenantId + "/oc_ehs/site_inventory_research/report/huaweilogv2.png";

        //Summary table - START
        summary_table += "<table class=\"TablesReport\">";
        summary_table += "<tr>";
        summary_table += "  <th class=\"Center\" colspan=\"10\">";
        summary_table += "   <span style=\"float:left; margin-left:0.5%;\"><img src='" + tigolog + "' width=\"50\" height=\"50\" /></span>";
        summary_table += "   <span><h1 class=\"MainTitles\" style=\"display:inline-block;margin-top:1%;text-align:center;\">INVENTARIO DE SITIO</h1></span>";
        summary_table += "   <span style=\"float:right; margin-right:0.5%;\"><img src='" + huaweilog + "' width=\"50\" height=\"50\" /></span>";
        summary_table += "  </th>";
        summary_table += "</tr>";
        summary_table += "</table>";
        summary_table += "<table class=\"TablesReport\">";
        summary_table += "<tr>";
        summary_table += " <th colspan=\"10\" style=\"border:0px;\"><h1 class=\"MainTitles\">Información general:</h1></th>";
        summary_table += "</tr>";

        summary_table += "<tr>";
        summary_table += " <td colspan=\"2\"><p class=\"titles\">Sitio ID: <span class=\"content\">" + record_info[6].site_id || 'NA' + "</span></p></td>";
        summary_table += " <td colspan=\"2\"><p class=\"titles\">Nombre de sitio: <span class=\"content\">" + record_info[6].site_name || 'NA' + "</span></p></td>";
        summary_table += " <td colspan=\"2\"><p class=\"titles\">Región: <span class=\"content\"> " + record_info[6].region || 'NA' + "</span></p></td>";
        summary_table += " <td colspan=\"2\"><p class=\"titles\">Departamento: <span class=\"content\">" + record_info[6].department || 'NA' + "</span></p></td>";
        summary_table += " <td colspan=\"2\"><p class=\"titles\">Ciudad: <span class=\"content\">" + record_info[6].city || 'NA' + "</span></p></td>";
        summary_table += "</tr>";

        summary_table += "<tr>";
        summary_table += " <td colspan=\"6\"><p class=\"titles\">Fecha de generación: <span class=\"content\">" + record_info[6].createtime + "</span></p></td>";
        summary_table += " <td colspan=\"6\"><p class=\"titles\">FME: <span class=\"content\">" + record_info[6].assign_to_fme_full_name + "(" + record_info[6].assign_to_fme + ")</span></p></td>";
        summary_table += "</tr>";

        summary_table += "<tr>";
        summary_table += " <td colspan=\"4\"><p class=\"titles\">Dirección: <span class=\"content\">" + record_info[6].site_address || 'NA' + "</span></p></td>";
        summary_table += " <td colspan=\"4\"><p class=\"titles\">Longitud: <span class=\"content\">" + record_info[6].site_long || 'NA' + "</span></p></td>";
        summary_table += " <td colspan=\"4\"><p class=\"titles\">Latitud: <span class=\"content\">" + record_info[6].site_lat || 'NA' + "</span></p></td>";
        summary_table += "</tr>";

        summary_table += "<tr>";
        summary_table += " <td colspan=\"5\"><p class=\"titles\">Orden de trabajo(WFM): <span class=\"content\">" + record_info[6].task_id || 'NA' + "</span></p></td>";
        summary_table += "</tr>";
        summary_table += "</table>";

        //Summary table - END

        //infrastructure_table TABLE START
        infrastructure_table += "<table class=\"TablesReport\">";
        infrastructure_table += "<tr>";
        infrastructure_table += " <th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Infraestructura</h1></th>";
        infrastructure_table += "</tr>";
        infrastructure_table += "<tbody>";

        infrastructure_table += `<tr>`;
        infrastructure_table += `<td><p class=\"titles\">Realizado por: <span class=\"content\">  ${infrastructure_form.assign_to_fme_full_name} (${infrastructure_form.assign_to_fme})</span></p></td>`;
        infrastructure_table += `<td><p class=\"titles\">Estado: <span class=\"content\">${infrastructure_form.form_status || "NA"}</span></p></td>`;
        infrastructure_table += `<td><p class=\"titles\">Propietario:<span class=\"content\">${infrastructure_form.owner || "NA"}</span></p></td>`
        infrastructure_table += `</tr>`;

        infrastructure_table += `<tr>`;
        infrastructure_table += `<td><p class=\"titles\">Tipo de sitio:<span class=\"content\">${infrastructure_form.site_type || "NA"}</span></p></td>`;
        infrastructure_table += `<td><p class=\"titles\">Tipo de estructura: <span class=\"content\">${infrastructure_form.structure_type || "NA"}</span></p></td>`;
        infrastructure_table += `<td><p class=\"titles\">Otros operadores instalados en piso:<span class=\"content\"> ${infrastructure_form.other_floor_mounted_operators || "NA"}</span></p></td>`
        infrastructure_table += `</tr>`;

        infrastructure_table += `<tr>`;
        infrastructure_table += `<td><p class=\"titles\">Lista de operadores: <span class=\"content\">${infrastructure_form.operator_list || "NA"}</span></p></td>`;
        infrastructure_table += `<td><p class=\"titles\">Otros operadores: <span class=\"content\"> ${infrastructure_form.other_operator_list || "NA"} </span></p></td>`;
        infrastructure_table += `<td><p class=\"titles\">Total de operadores (contando a Tigo): <span class=\"content\">${infrastructure_form.total_operators || "NA"}</span></p></td>`;
        infrastructure_table += `</tr>`;

        infrastructure_table += "</tbody></table>"
        //infrastructure_table END

        //energy_table TABLE START
        energy_table += "<table class=\"TablesReport\">";
        energy_table += "<tr>";
        energy_table += " <th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Energía</h1></th>";
        energy_table += "</tr>";
        energy_table += "<tbody>";

        energy_table += `<tr>`;
        energy_table += `<td><p class=\"titles\">Realizado por: <span class=\"content\">  ${energy_form.assign_to_fme_full_name} (${energy_form.assign_to_fme})</span></p></td>`;
        energy_table += `<td><p class=\"titles\">Estado: <span class=\"content\">${energy_form.form_status || "NA"}</span></p></td>`;
        energy_table += `<td><p class=\"titles\">Amperaje de salida del totalizador: <span class=\"content\">${energy_form.totalizer_output_amperage || 0} A</span></p></td>`;

        energy_table += `</tr>`;

        energy_table += `<tr>`;
        energy_table += `<td><p class=\"titles\">Cantidad medidores externos:<span class=\"content\"> ${energy_form.no_external_meters || "NA"}</span></p></td>`;
        energy_table += `<td><p class=\"titles\">Medidores internos?:<span class=\"content\"> ${energy_form.internal_meters || "NA"}</span></p></td>`;
        energy_table += `<td><p class=\"titles\">Cantidad medidores internos:<span class=\"content\"> ${energy_form.no_internal_meters || "NA"}</span></p></td>`;
        energy_table += `</tr>`;

        energy_table += `<tr>`;
        energy_table += `<td><p class=\"titles\">Otros Operadores conectados?: <span class=\"content\">${energy_form.other_connected_op || 0} </span></p></td>`;
        energy_table += `<td><p class=\"titles\">Cuántos otros operadores?: <span class=\"content\">${energy_form.operator_quantity || 0} </span></p></td>`;
        energy_table += `<td><p class=\"titles\">Cuales Operadores adicionales?: <span class=\"content\">${energy_form.operator_list || ''} </span></p></td>`;
        energy_table += `</tr>`;

        energy_table += `<tr>`;
        energy_table += `<td colspan=\"3\" ><p class=\"titles\">Hallazgos / Observaciones:<span class=\"content\"> ${energy_form.findings || "NA"}</span></p></td>`;
        energy_table += `</tr>`;

        energy_table += "</tbody></table>"
        //energy_table end


        if (meter_list.length > 0) {
            //meter_table TABLE START
            meter_table += `<table class=\"TablesReport\">`;
            meter_table += `<tr>`;
            meter_table += `<th style=\"border:0px;\" <h1 class=\"MainTitles\">Medidores</h1></th>`;
            meter_table += `</tr>`;
            meter_table += `<tr>`;
            meter_table += `<th class=\"titles\" >#</th>`;
            meter_table += `<th class=\"titles\" >Ubicación</th>`;
            meter_table += `<th class=\"titles\">¿Es vulnerable?</th>`;
            meter_table += `<th class=\"titles\">Tipo de vulnerabilidad</th>`;
            meter_table += `<th class=\"titles\">Estado</th>`;
            meter_table += `<th class=\"titles\">Amperaje de salida</th>`;
            meter_table += `<th class=\"titles\">Conexión fraudulenta</th>`;
            meter_table += `<th class=\"titles\">Comentarios</th>`;
            meter_table += `</tr>`;
            meter_table += `<tbody>`;
            var nm = meter_list.length;
            var n = 0;
            for (n; n < nm; n++) {
                meter_table += `<tr>`;
                meter_table += `<td width="20px"><span class=\"content\"> ${n + 1 || "NA"}</span></td>`;
                meter_table += `<td><span class=\"content\"> ${meter_list[n].meter_type || "NA"}</span></p></td>`;
                meter_table += `<td><span class=\"content\"> ${meter_list[n].is_vulnerable || "NA"}</span></p></td>`;
                meter_table += `<td><span class=\"content\"> ${meter_list[n].vulnerable || "NA"}</span></p></td>`;
                meter_table += `<td><span class=\"content\"> ${meter_list[n].meter_status || "NA"}</span></p></td>`;
                meter_table += `<td><span class=\"content\"> ${meter_list[n].meter_amperage || "NA"} A</span></p></td>`;
                meter_table += `<td><span class=\"content\"> ${meter_list[n].is_fraudulent_connection || "NA"} A</span></p></td>`;
                meter_table += `<td><span class=\"content\"> ${meter_list[n].comments || "NA"} A</span></p></td>`;
                meter_table += `</tr>`;
            }

            meter_table += "</tbody></table>"

            //METER PHOTOGRAPHIC EVIDENCE
            n = 0;
            for (n; n < nm; n++) {

                if ((meter_list[n].is_vulnerable || "NA").toLowerCase().includes("si")) {
                    meter_table += `<table class=\"TablesReport\">`;
                    meter_table += `<tr>`;
                    meter_table += `<th style=\"border:0px;\" <h1 class=\"MainTitles\">EVIDENCIA DE VULNERABILIDAD EN MEDIDOR ${n + 1} (${meter_list[n].vulnerable})</h1></th>`;
                    meter_table += `</tr>`
                    meter_table += `<tr>`;
                    meter_table += build_photo_content('meter_vulnerability_evidence', meter_list[n].meter_id, meter_list[n].version || 0);
                    meter_table += `</tr>`;
                    meter_table += "</tbody></table>";
                }

                if ((meter_list[n].is_fraudulent_connection || "NA").toLowerCase().includes("si")) {
                    meter_table += `<table class=\"TablesReport\">`;
                    meter_table += `<tr>`;
                    meter_table += `<th style=\"border:0px;\" <h1 class=\"MainTitles\">EVIDENCIA DE CONEXIÓN FRAUDULENTA EN MEDIDOR #${n + 1}</h1></th>`;
                    meter_table += `</tr>`
                    meter_table += `<tr>`;
                    meter_table += build_photo_content('fraudulent_connection_ev', meter_list[n].meter_id, meter_list[n].version || 0);
                    meter_table += `</tr>`;
                    meter_table += "</tbody></table>";
                }


            }

            meter_table += "</tbody></table>"
        }


        //physical_security_table TABLE START
        physical_security_table += "<table class=\"TablesReport\">";
        physical_security_table += "<tr>";
        physical_security_table += " <th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Seguridad Física</h1></th>";
        physical_security_table += "</tr>";
        physical_security_table += "<tbody>";

        physical_security_table += `<tr>`;
        physical_security_table += `<td><p class=\"titles\">Realizado por: <span class=\"content\">  ${physical_security_form.assign_to_fme_full_name} (${physical_security_form.assign_to_fme})</span></p></td>`;
        physical_security_table += `<td colspan="4"><p class=\"titles\">Estado: <span class=\"content\">${physical_security_form.form_status || "NA"}</span></p></td>`;
        physical_security_table += `</tr>`;

        physical_security_table += `<tr>`;
        physical_security_table += `<td><p class=\"titles\">¿Cuenta con cerramiento? :<span class=\"content\"> ${physical_security_form.enclosure || "NA"}</span></p></td>`;
        physical_security_table += `<td><p class=\"titles\">Tipo :<span class=\"content\"> ${physical_security_form.enclosure_type || "NA"}</span></p></td>`;
        physical_security_table += `<td><p class=\"titles\">Condición :<span class=\"content\"> ${physical_security_form.enclosure_condition || "NA"}</span></p></td>`;
        physical_security_table += `<td><p class=\"titles\">Detalle de la condición :<span class=\"content\"> ${physical_security_form.bad_status_detail || "NA"}</span></p></td>`;
        physical_security_table += `<td><p class=\"titles\">Altura :<span class=\"content\"> ${physical_security_form.enclosure_height || "NA"}</span></p></td>`;
        physical_security_table += `</tr>`;

        physical_security_table += `<tr>`;
        physical_security_table += `<td><p class=\"titles\">Tipo de cerradura :<span class=\"content\"> ${physical_security_form.lock_type || "NA"}</span></p></td>`;
        physical_security_table += `<td><p class=\"titles\">Otro tipo de cerradura :<span class=\"content\"> ${physical_security_form.lock_type_other || "NA"}</span></p></td>`;
        physical_security_table += `<td colspan="5"><p class=\"titles\">Condición :<span class=\"content\"> ${physical_security_form.lock_condition || "NA"}</span></p></td>`;
        physical_security_table += `</tr>`;

        physical_security_table += `<tr>`;
        physical_security_table += `<td><p class=\"titles\">Reflectores en sitio :<span class=\"content\"> ${physical_security_form.reflectors_on_site || "NA"}</span></p></td>`;
        physical_security_table += `<td colspan="5" ><p class=\"titles\">Estado visual :<span class=\"content\"> ${physical_security_form.reflector_visual_status || "NA"}</span></p></td>`;
        physical_security_table += `</tr>`;

        physical_security_table += `<tr>`;
        physical_security_table += `<td><p class=\"titles\">Sitemas de seguridad electrónicos :<span class=\"content\"> ${physical_security_form.electronic_security_systems || "NA"}</span></p></td>`;
        physical_security_table += `<td><p class=\"titles\">Tipo :<span class=\"content\"> ${physical_security_form.electronic_sec_systems_type || "NA"}</span></p></td>`;
        physical_security_table += `<td colspan="3"><p class=\"titles\">Estado visual :<span class=\"content\"> ${physical_security_form.electronic_sec_systems_status || "NA"}</span></p></td>`;
        physical_security_table += `</tr>`;

        physical_security_table += `<tr>`;
        physical_security_table += `<td colspan=\"5\"><p class=\"titles\">Hallazgos / Observaciones :<span class=\"content\"> ${physical_security_form.findings || "NA"}</span></p></td>`;
        physical_security_table += `</tr>`;

        physical_security_table += "</tbody></table>"
        //physical_security_table end

        //physical_security_photo_table TABLE START
        physical_security_photo_table += "<table class=\"TablesReport\">";
        physical_security_photo_table += "<tr>";
        physical_security_photo_table += " <th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Seguridad Física (Registro fotográfico)</h1></th>";
        physical_security_photo_table += "</tr>";
        physical_security_photo_table += "<tr>";
        physical_security_photo_table += `<th style=\"border:0px;\" colspan=\"10\" <h3 class=\"MainTitles\">Alrededores</h3></th>`;
        physical_security_photo_table += "</tr>";
        physical_security_photo_table += build_photo_content("alrededores", tower_form.tower_id_form, tower_form.version || 0);
        physical_security_photo_table += "</tbody></table>";
        let ps = 0;
        let np = physical_security_photos.length;
        for (ps; ps < np; ps++) {
            physical_security_photo_table += "<table class=\"TablesReport\">";
            physical_security_photo_table += "<tr>";
            physical_security_photo_table += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">${physical_security_photos[ps].toUpperCase().replaceAll("_", " ") || "NA"}</h1></th>`;
            physical_security_photo_table += "</tr>";
            physical_security_photo_table += build_photo_content(physical_security_photos[ps], physical_security_form.physical_sec_id_form, physical_security_form.version || 0);
            physical_security_photo_table += "</tbody></table>";
        }

        //physical_security_photo_table TABLE END


        //tower_table TABLE START
        tower_table += "<table class=\"TablesReport\">";
        tower_table += "<tr>";
        tower_table += " <th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Torre</h1></th>";
        tower_table += "</tr>";
        tower_table += "<tbody>";

        tower_table += `<tr>`;
        tower_table += `<td  colspan="2"><p class=\"titles\">Realizado por: <span class=\"content\">  ${tower_form.assign_to_fme_full_name} (${tower_form.assign_to_fme})</span></p></td>`;
        tower_table += `<td colspan="2"><p class=\"titles\">Estado: <span class=\"content\">${tower_form.form_status || "NA"}</span></p></td>`;
        tower_table += `</tr>`;

        tower_table += `<tr>`;
        tower_table += `<td><p class=\"titles\">Línea de vida: <span class=\"content\"> ${tower_form.lifeline || "NA"}</span></p></td>`;
        tower_table += `<td><p class=\"titles\">Condición de la línea de vida: <span class=\"content\"> ${tower_form.lifeline_condition || "NA"}</span></p></td>`;
        tower_table += `<td><p class=\"titles\">Certificación:<span class=\"content\"> ${tower_form.lifeline_current_certification || "NA"}</span></p></td>`;
        tower_table += `<td><p class=\"titles\">Otros operadores en la franja de Tigo:<span class=\"content\"> ${tower_form.other_op_in_strip || "NA"}</span></p></td>`;
        tower_table += `</tr>`;

        tower_table += `<tr>`;
        tower_table += `<td colspan=\"4\"><p class=\"titles\">Hallazgos / Observaciones: <span class=\"content\">  ${tower_form.findings || "NA"} </span></p></td>`;
        tower_table += `</tr>`;

        tower_table += "</tbody></table>"
        //tower_table end

        //TOWER PHOTOS
        tower_table += "<table class=\"TablesReport\">";
        tower_table += "<tr>";
        tower_table += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Panorámica de elementos de Torre desde piso </h1></th>`;
        tower_table += "</tr>";
        tower_table += "<tbody>";
        tower_table += `<tr>`;
        tower_table += build_photo_content("floor_tower_elements", tower_form.keycode, tower_form.version || 0);
        tower_table += `</tr>`;
        tower_table += "</tbody></table>"


        //TOWER PHOTOS END

        var ttl = tigo_tower_elements.length;
        if (ttl > 0) {
            //tower_table TABLE START
            tower_table_tigo_elements += "<table class=\"TablesReport\">";
            tower_table_tigo_elements += "<tr>";
            tower_table_tigo_elements += " <th style=\"border:0px;\" colspan=\"11\" <h1 class=\"MainTitles\">Elementos de torre Tigo</h1></th>";
            tower_table_tigo_elements += "</tr>";
            tower_table_tigo_elements += "<tbody>";
            tower_table_tigo_elements += `<tr>`;
            tower_table_tigo_elements += `<td colspan="11"><p class=\"titles\">Cantidad:<span class=\"content\"> ${tower_form.number_of_tigo_twr_el || "NA"}</span></p></td>`;
            tower_table_tigo_elements += `</tr>`;
            tower_table_tigo_elements += `<tr>`;
            tower_table_tigo_elements += `<th width="15px" class=\"titles\">#</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Propietario</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Tipo</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Referencia</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Arista/Cara</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Azimuth</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Altura con respecto a la torre (m)</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Medidas (alto, ancho, largo)</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Diámetro (m)</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Estado de encendido</th>`;
            tower_table_tigo_elements += `<th class=\"titles\">Comentarios</th>`;
            tower_table_tigo_elements += `</tr>`;

            var tw = 0;

            for (tw; tw < ttl; tw++) {
                tower_table_tigo_elements += `<tr>`;
                tower_table_tigo_elements += `<td >${tw + 1 || "NA"}</td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].tower_element_owner || "NA"}</td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].element_type || "NA"}</td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].reference || "NA"}</td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].edge_face || "NA"}</td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].azimuth || "NA"}</td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].height_relative_tower || "NA"}</td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].height || "0"} m * ${tigo_tower_elements[tw].width || "0"} m * ${tigo_tower_elements[tw].length || "0"} m</td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].size_diameter || "NA"} </td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].operation || "NA"}</td>`;
                tower_table_tigo_elements += `<td class="content">${tigo_tower_elements[tw].comments || "NA"}</td>`;
                tower_table_tigo_elements += `</tr>`;
            }

            tower_table_tigo_elements += "</tbody></table>"

        }


        var otl = other_tower_elements.length;
        if (otl > 0) {
            tower_table_other_elements += "<table class=\"TablesReport\">";
            tower_table_other_elements += "<tr>";
            tower_table_other_elements += " <th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Elementos de torre otros operadores</h1></th>";
            tower_table_other_elements += "</tr>";
            tower_table_other_elements += "<tbody>";
            tower_table_other_elements += `<tr>`;
            tower_table_other_elements += `<td colspan="10"><p class=\"titles\">Cantidad:<span class=\"content\"> ${tower_form.number_of_other_twr_el || "NA"}</span></p></td>`;
            tower_table_other_elements += `<tr>`;
            tower_table_other_elements += `<th width="15px" class=\"titles\">#</th>`;
            tower_table_other_elements += `<th class=\"titles\">Propietario</th>`;
            tower_table_other_elements += `<th class=\"titles\">Tipo</th>`;
            tower_table_other_elements += `<th class=\"titles\">Referencia</th>`;
            tower_table_other_elements += `<th class=\"titles\">Arista/Cara</th>`;
            tower_table_other_elements += `<th class=\"titles\">Azimuth</th>`;
            tower_table_other_elements += `<th class=\"titles\">Altura con respecto a la torre (m)</th>`;
            tower_table_other_elements += `<th class=\"titles\">Medidas (alto, ancho, largo)</th>`;
            tower_table_other_elements += `<th class=\"titles\">Diámetro (m)</th>`;
            tower_table_other_elements += `<th class=\"titles\">Comentarios</th>`;
            tower_table_other_elements += `</tr>`;

            var tw = 0;

            for (tw; tw < otl; tw++) {
                tower_table_other_elements += `<tr>`;
                tower_table_other_elements += `<td>${tw + 1 || "NA"}</td>`;
                tower_table_other_elements += `<td class="content">${other_tower_elements[tw].tower_element_owner || "NA"}</td>`;
                tower_table_other_elements += `<td class="content">${other_tower_elements[tw].element_type || "NA"}</td>`;
                tower_table_other_elements += `<td class="content">${other_tower_elements[tw].reference || "NA"}</td>`;
                tower_table_other_elements += `<td class="content">${other_tower_elements[tw].edge_face || "NA"}</td>`;
                tower_table_other_elements += `<td class="content">${other_tower_elements[tw].azimuth || "NA"}</td>`;
                tower_table_other_elements += `<td class="content">${other_tower_elements[tw].height_relative_tower || "NA"}</td>`;
                tower_table_other_elements += `<td class="content">${other_tower_elements[tw].height || "0"}m * ${other_tower_elements[tw].width || "0"}m * ${other_tower_elements[tw].length || "0"}m</td>`;
                tower_table_other_elements += `<td class="content">${other_tower_elements[tw].size_diameter || "NA"}</td>`;
                tower_table_other_elements += `<td class="content">${other_tower_elements[tw].comments || "NA"}</td>`;
                tower_table_other_elements += `</tr>`;
            }

            tower_table_other_elements += "</tbody></table>"
            //tower_table_other_elements end


            //OTHER TOWER ELEMENT PHOTOS START
            var tw = 0;

            for (tw; tw < otl; tw++) {
                tower_table_other_elements += "<table class=\"TablesReport\">";
                tower_table_other_elements += "<tr>";
                tower_table_other_elements += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">EVIDENCIA FOTOGRÁFICA DEL ELEMENTO #${tw + 1 || "NA"} </h1></th>`;
                tower_table_other_elements += "</tr>";
                tower_table_other_elements += "<tbody>";
                tower_table_other_elements += `<tr>`;
                tower_table_other_elements += build_photo_content("element_photo", other_tower_elements[tw].keycode, other_tower_elements[tw].version || 0);
                tower_table_other_elements += `</tr>`;
                tower_table_other_elements += "</tbody></table>"
            }


            //OTHER TOWER ELEMENT PHOTOS END
        }

        // RACK TABLE START
        rack_table += "<table class=\"TablesReport\">";
        rack_table += "<tr>";
        rack_table += " <th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Racks</h1></th>";
        rack_table += "</tr>";
        rack_table += "<tbody>";

        rack_table += `<tr>`;
        rack_table += `<td><p class=\"titles\">Realizado por: <span class=\"content\">  ${rack_form.assign_to_fme_full_name} (${rack_form.assign_to_fme})</span></p></td>`;
        rack_table += `<td><p class=\"titles\">Estado: <span class=\"content\">${rack_form.form_status || "NA"}</span></p></td>`;
        rack_table += `<td><p class=\"titles\">¿Se reporta puerta abierta en gestores?: <span class=\"content\">${rack_form.open_door_reported_manager || "NA"} </span></p></td>`;
        rack_table += `</tr>`;

        rack_table += `<tr>`;
        rack_table += `<td><p class=\"titles\">¿Hay gabinetes de otros operadores?:<span class=\"content\"> ${rack_form.other_operator_cabinets || "NA"}</span></p></td>`;
        rack_table += `<td colspan="2"><p class=\"titles\">¿Hay gabinetes de otros operadores en el área de Tigo?:<span class=\"content\"> ${rack_form.other_cabinets_in_tigo_area || "NA"}</span></p></td>`;
        rack_table += `</tr>`;

        rack_table += `<tr>`;
        rack_table += `<td colspan=\"3\"><p class=\"titles\">Hallazgos / Observaciones :<span class=\"content\"> ${rack_form.findings || "NA"}</span></p></td>`;
        rack_table += `</tr>`;
        rack_table += "</tbody></table>"

        if ((rack_form.other_operator_cabinets || "NA").toLowerCase().includes("si")) {
            rack_table += "<table class=\"TablesReport\">";
            rack_table += `<tr>`;
            rack_table += `<td colspan="10"><p class=\"titles\">Panorámica de los gabinetes en sitio<span class=\"content\"></p></td>`;
            rack_table += `</tr>`;
            rack_table += `<tr>`;
            rack_table += build_photo_content("racks_on_site", rack_form.rack_form_id, rack_form.version || 0);
            rack_table += `</tr>`;
            rack_table += "</tbody></table>"
        }


        //RACK TABLE END

        //TIGO CABINETS
        var tcl = tigo_cabinets.length;
        if (tcl > 0) {
            tigo_cabinets_table += "<table class=\"TablesReport\">";
            tigo_cabinets_table += "<tr>";
            tigo_cabinets_table += " <th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Gabinetes de Tigo</h1></th>";
            tigo_cabinets_table += "</tr>";
            tigo_cabinets_table += "<tbody>";
            tigo_cabinets_table += `<tr>`;
            tigo_cabinets_table += `<td colspan="10"><p class=\"titles\">Cantidad:<span class=\"content\"> ${rack_form.number_tigo_cabinets || "NA"}</span></p></td>`;
            tigo_cabinets_table += `</tr>`;
            tigo_cabinets_table += `<tr>`;
            tigo_cabinets_table += `</tr>`;
            tigo_cabinets_table += `</tbody></table>`;
            var tc = 0;
            for (tc; tc < tcl; tc++) {
                tigo_cabinets_table += "<table class=\"TablesReport\">";
                tigo_cabinets_table += "<tr>";
                tigo_cabinets_table += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Gabinete de Tigo #${tc + 1}</h1></th>`;
                tigo_cabinets_table += "</tr>";
                tigo_cabinets_table += "<tbody>";
                tigo_cabinets_table += `<tr>`;
                tigo_cabinets_table += `<td><p class=\"titles\">Estado: <span class=\"content\"> ${tigo_cabinets[tc].cabinet_status || "NA"}</span></p></td>`;
                tigo_cabinets_table += `<td><p class=\"titles\">¿Gabinete operativo?: <span class=\"content\"> ${tigo_cabinets[tc].operating || "NA"}</span></p></td>`;
                tigo_cabinets_table += `<td><p class=\"titles\">Estatus de la cerradura: <span class=\"content\"> ${tigo_cabinets[tc].lock_status || "NA"}</span></p></td>`;
                tigo_cabinets_table += `</tr>`;
                tigo_cabinets_table += `<tr>`;
                tigo_cabinets_table += `<td colspan=\"3\" ><p  class=\"titles\">Comentarios / Observaciones: <span class=\"content\"> ${tigo_cabinets[tc].comments || "NA"}</span></p></td>`;
                tigo_cabinets_table += `</tr>`;
                tigo_cabinets_table += `</tbody></table>`;
                tigo_cabinets_table += "<table class=\"TablesReport\">";
                tigo_cabinets_table += "<tr>";
                tigo_cabinets_table += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Gabinete #${tc + 1} de Tigo (Abierto)</h1></th>`;
                tigo_cabinets_table += "</tr>";
                tigo_cabinets_table += "<tbody>";
                tigo_cabinets_table += `<tr>`;
                tigo_cabinets_table += build_photo_content("cabinet_open_photo", tigo_cabinets[tc].cabinet_id, tigo_cabinets[tc].version || 0);
                tigo_cabinets_table += `</tr>`;
                tigo_cabinets_table += `</tbody></table>`;
                tigo_cabinets_table += "<table class=\"TablesReport\">";
                tigo_cabinets_table += "<tr>";
                tigo_cabinets_table += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Gabinete #${tc + 1} de Tigo (Cerrado)</h1></th>`;
                tigo_cabinets_table += "</tr>";
                tigo_cabinets_table += "<tbody>";
                tigo_cabinets_table += `<tr>`;
                tigo_cabinets_table += build_photo_content("cabinet_close_photo", tigo_cabinets[tc].cabinet_id, tigo_cabinets[tc].version || 0);
                tigo_cabinets_table += `</tr>`;
                tigo_cabinets_table += `</tbody></table>`;
                if (tigo_cabinets[tc].lock_status || "NA" == "MALO") {
                    tigo_cabinets_table += "<table class=\"TablesReport\">";
                    tigo_cabinets_table += "<tbody>";
                    tigo_cabinets_table += `<tr>`;
                    tigo_cabinets_table += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Cerradura del gabinete de Tigo #${tc + 1}</h1></th>`;
                    tigo_cabinets_table += `</tr>`;
                    tigo_cabinets_table += `<tr>`;
                    tigo_cabinets_table += build_photo_content("lock_photo", tigo_cabinets[tc].cabinet_id, tigo_cabinets[tc].version || 0);
                    tigo_cabinets_table += `</tr>`;
                    tigo_cabinets_table += `</tbody></table>`;

                }

                tigo_cabinets_table += `</tbody></table>`;
            }
        }

        //TIGO CABINETS END



        //OTHER CABINETS
        var ocl = other_cabinets.length;
        if (ocl > 0) {
            other_cabinets_table += "<table class=\"TablesReport\">";
            other_cabinets_table += "<tr>";
            other_cabinets_table += " <th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Gabinetes de Otros operadores</h1></th>";
            other_cabinets_table += "</tr>";
            other_cabinets_table += "<tbody>";
            other_cabinets_table += `<tr>`;
            other_cabinets_table += `<td colspan="10"><p class=\"titles\">Cantidad:<span class=\"content\"> ${rack_form.number_other_cabinets || "NA"}</span></p></td>`;
            other_cabinets_table += `</tr>`;
            other_cabinets_table += `</tbody></table>`;
            var oc = 0;
            for (oc; oc < ocl; oc++) {
                other_cabinets_table += "<table class=\"TablesReport\">";
                other_cabinets_table += "<tr>";
                other_cabinets_table += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Gabinete de otro operador #${oc + 1}</h1></th>`;
                other_cabinets_table += "</tr>";
                other_cabinets_table += "<tbody>";
                other_cabinets_table += `<tr>`;
                other_cabinets_table += `<td><p class=\"titles\">Estado: <span class=\"content\"> ${other_cabinets[oc].cabinet_status || "NA"}</span></p></td>`;
                other_cabinets_table += `<td><p class=\"titles\">¿Gabinete operativo?: <span class=\"content\"> ${other_cabinets[oc].operating || "NA"}</span></p></td>`;
                other_cabinets_table += `<td><p class=\"titles\">Estatus de la cerradura: <span class=\"content\"> ${other_cabinets[oc].lock_status || "NA"}</span></p></td>`;
                other_cabinets_table += `</tr>`;
                other_cabinets_table += `<tr>`;
                other_cabinets_table += `<td><p class=\"titles\">Comentarios / Observaciones : <span class=\"content\"> ${other_cabinets[oc].comments || "NA"}</span></p></td>`;
                other_cabinets_table += `</tr>`;
                other_cabinets_table += `</tbody></table>`;
                other_cabinets_table += "<table class=\"TablesReport\">";
                other_cabinets_table += "<tbody>";
                other_cabinets_table += `<tr>`;
                other_cabinets_table += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Panorámica de gabinete de otro operador #${oc + 1}</h1></th>`;
                other_cabinets_table += `</tr>`;
                other_cabinets_table += `<tr>`;
                other_cabinets_table += build_photo_content("cabinet_photo", other_cabinets[oc].cabinet_id, other_cabinets[oc].version || 0);
                other_cabinets_table += `</tr>`;
                other_cabinets_table += `</tbody></table>`;

                if (other_cabinets[oc].lock_status == "MALO") {
                    other_cabinets_table += `<tr>`;
                    other_cabinets_table += `<th style=\"border:0px;\" colspan=\"10\" <h1 class=\"MainTitles\">Cerradura del Gabinete de otro operador #${oc + 1}</h1></th>`;
                    other_cabinets_table += `</tr>`;
                    other_cabinets_table += `<tr>`;
                    other_cabinets_table += build_photo_content("lock_photo", other_cabinets[oc].cabinet_id, other_cabinets[oc].version || 0);
                    other_cabinets_table += `</tr>`;
                }

                other_cabinets_table += `</tbody></table>`;
            }
        }

        //OTHER CABINETS END








        content += summary_table;
        content += infrastructure_table;
        content += energy_table;
        content += meter_table;
        content += physical_security_table;
        content += physical_security_photo_table;
        content += tower_table;
        content += tower_table_tigo_elements;
        content += tower_table_other_elements;
        content += rack_table;
        content += tigo_cabinets_table;
        content += other_cabinets_table;
        $('#page1').html(content);
    });
});

/**
 * 
 * @param {*} report_id 
 * @returns 
 */
function get_summary_info(report_id) {
    var summary_info;
    MessageProcessor.process({
        serviceId: "get_forms_by_reportid_for_pdf_report",
        data: {
            "report_id": report_id
        },
        async: false,
        success: function (json) {
            summary_info = json.results;
        }
    });
    return summary_info;
}



/**
 * 
 * @param {*} photo_item 
 * @param {*} task_id 
 * @returns 
 */
function build_photo_content(photo_item, task_id, version) {
    var total = 0;
    var rows = 0;
    var number_picture = 1;
    var r;
    var photo_table = ""

    //Define static vars
    var span_label = ' <th colspan=\"2.5\" class=\"titles\" style=\"text-align:center;border-bottom:0px;\">';

    //Call service for get the total evidences
    MessageProcessor.process({
        serviceId: "site_inventory_photos_getList",
        data: {
            "start": 0,
            "limit": 10,
            "task_id": task_id,
            "photo_item": photo_item,
            "version": version
        },
        async: false,
        success: function (jsonj) {
            r = jsonj.results
            total = r.length;
            rows = r.length;
        }

    })

    if (total > 0) {
        for (var i = 0; i < total; i += 3) {
            //Verify the quantity for build 1 or 2 rows
            if (rows < 3) {
                //Build 2 rows
                if (rows == 2) {
                    var acum1 = parseInt(i + 1);

                    //Titles
                    var title1 = "Evidencia #" + number_picture;
                    var title2 = "Evidencia #" + (number_picture + 1);

                    //Photos
                    var photo_content1 = build_photo_url(r[i]);
                    var photo_content2 = build_photo_url(r[acum1]);

                    //Content
                    photo_table += "<tr>";
                    photo_table += span_label + title1 + "</th>";
                    photo_table += span_label + title2 + "</th>";
                    photo_table += "</tr>";

                    photo_table += "<tr>";
                    photo_table += photo_content1;
                    photo_table += photo_content2;
                    photo_table += "</tr>";
                }
                //Build 1 row
                else {
                    //Titles
                    var title1 = "Evidencia #" + number_picture;

                    //Photos
                    var photo_content1 = build_photo_url(r[i]);

                    //Content
                    photo_table += "<tr>";
                    photo_table += span_label + title1 + "</th>";
                    photo_table += "</tr>";

                    photo_table += "<tr>";
                    photo_table += photo_content1;
                    photo_table += "</tr>";
                }
            }
            //Build 3 rows normally
            else {
                var acum1 = parseInt(i + 1);
                var acum2 = parseInt(i + 2);

                //Titles
                var title1 = "Evidencia #" + number_picture;
                var title2 = "Evidencia #" + (number_picture + 1);
                var title3 = "Evidencia #" + (number_picture + 2);

                //Photos
                var photo_content1 = build_photo_url(r[i]);
                var photo_content2 = build_photo_url(r[acum1]);
                var photo_content3 = build_photo_url(r[acum2]);

                //Content
                photo_table += "<tr>";
                photo_table += span_label + title1 + "</th>";
                photo_table += span_label + title2 + "</th>";
                photo_table += span_label + title3 + "</th>";
                photo_table += "</tr>";

                photo_table += "<tr>";
                photo_table += photo_content1;
                photo_table += photo_content2;
                photo_table += photo_content3;
                photo_table += "</tr>";
            }
            rows = rows - 3;
            number_picture++;
        }
    } else {
        console.log("No tiene fotos");
        photo_table += "<tr>";
        photo_table += " <td colspan=\"12\"><p class=\"titles\"><span class=\"content\">N/A</span></p></td>";
        photo_table += "</tr>";
    }

    return photo_table;
}



/**
 * 
 * @param {*} photo_item 
 * @param {*} task_id 
 * @returns 
 */
function build_photo_content_2(title, photo_item, task_id) {
    var total = 0;
    var rows = 0;
    var number_picture = 1;
    var r;
    var photo_table = ""

    //Define static vars
    var span_label = ' <th colspan=\"2.5\" class=\"titles\" style=\"text-align:center;border-bottom:0px;\">';

    //Call service for get the total evidences
    MessageProcessor.process({
        serviceId: "site_inventory_photos_getList",
        data: {
            "start": 0,
            "limit": 10,
            "task_id": task_id,
            "photo_item": photo_item
        },
        async: false,
        success: function (jsonj) {
            r = jsonj.results
            total = r.length;
            rows = r.length;
        }

    })

    if (total > 0) {
        for (var i = 0; i < total; i += 3) {
            //Verify the quantity for build 1 or 2 rows
            if (rows < 3) {
                //Build 2 rows
                if (rows == 2) {
                    var acum1 = parseInt(i + 1);

                    //Titles
                    var title1 = "Evidencia #" + number_picture;
                    var title2 = "Evidencia #" + (number_picture + 1);

                    //Photos
                    var photo_content1 = build_photo_url(r[i]);
                    var photo_content2 = build_photo_url(r[acum1]);

                    //Content
                    photo_table += "<tr>";
                    photo_table += span_label + title1 + "</th>";
                    photo_table += span_label + title2 + "</th>";
                    photo_table += "</tr>";

                    photo_table += "<tr>";
                    photo_table += photo_content1;
                    photo_table += photo_content2;
                    photo_table += "</tr>";
                }
                //Build 1 row
                else {
                    //Titles
                    var title1 = "Evidencia #" + number_picture;

                    //Photos
                    var photo_content1 = build_photo_url(r[i]);

                    //Content
                    photo_table += "<tr>";
                    photo_table += span_label + title1 + "</th>";
                    photo_table += "</tr>";

                    photo_table += "<tr>";
                    photo_table += photo_content1;
                    photo_table += "</tr>";
                }
            }
            //Build 3 rows normally
            else {
                var acum1 = parseInt(i + 1);
                var acum2 = parseInt(i + 2);

                //Titles
                var title1 = "Evidencia #" + number_picture;
                var title2 = "Evidencia #" + (number_picture + 1);
                var title3 = "Evidencia #" + (number_picture + 2);

                //Photos
                var photo_content1 = build_photo_url(r[i]);
                var photo_content2 = build_photo_url(r[acum1]);
                var photo_content3 = build_photo_url(r[acum2]);

                //Content
                photo_table += "<tr>";
                photo_table += span_label + title1 + "</th>";
                photo_table += span_label + title2 + "</th>";
                photo_table += span_label + title3 + "</th>";
                photo_table += "</tr>";

                photo_table += "<tr>";
                photo_table += photo_content1;
                photo_table += photo_content2;
                photo_table += photo_content3;
                photo_table += "</tr>";
            }
            rows = rows - 3;
            number_picture++;
        }
    } else {
        console.log("No tiene fotos");
        photo_table += "<tr>";
        photo_table += " <td colspan=\"12\"><p class=\"titles\"><span class=\"content\">N/A</span></p></td>";
        photo_table += "</tr>";
    }

    return photo_table;
}



/**
 * 
 * @param {*} item 
 * @returns 
 */
function build_photo_url(item) {
    var photo_result;
    var hrefStr = location.href;
    var contextStr = hrefStr.substring(0, hrefStr.indexOf("/app"));
    var photo_width = "400";
    var photo_height = "400";

    var batch_id = item.batch_file.attachment[0].batchId;
    var attachmentId = item.batch_file.attachment[0].attachmentId;
    photo_result = contextStr + "/app/fileservice/get?batchId=" + batch_id + "&attachmentId=" + attachmentId;
    var label = "<td colspan=\"2.5\" style=\"text-align:center;border-top:0px;\"><img src='" + photo_result + "' width=\"" + photo_width + "\" height=\"" + photo_height + "\"/></td>"
    return label;
}

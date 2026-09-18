/**
 * Dữ liệu tour VR360 — dán/thay JSON của bạn vào biến TOUR_DATA bên dưới.
 *
 * TOUR_DATA là MẢNG các bản published version, mỗi phần tử là 1 điểm/địa danh:
 * [
 *   {
 *     id, location, version_number, label,
 *     data: {
 *       title,
 *       scenes: [
 *         {
 *           id, name, group,
 *           image, thumb,                     // URL panorama / thumbnail (equirectangular)
 *           initialView: { lon, lat, fov },    // góc nhìn ban đầu khi vào scene
 *           hotspots: [
 *             {
 *               id, label,
 *               type: "nav" | "info" | "area_landmark",
 *               target,                        // id scene sẽ chuyển tới (nav / area_landmark)
 *               lon, lat,                       // vị trí hotspot (nav / info)
 *               vertices: [{ lat, lon }],        // đa giác vùng (area_landmark)
 *               style: { fill, border, opacity, borderWidth },
 *               entryView: { lon, lat, fov },    // góc nhìn khi tới scene đích (tuỳ chọn)
 *               noi_dung: {                      // nội dung info hotspot
 *                 tieu_de, mo_ta, mo_ta_ngan, lien_ket,
 *                 anh_minh_hoa, youtube_url, danh_sach_anh: [],
 *               },
 *             },
 *           ],
 *         },
 *       ],
 *     },
 *   },
 * ]
 *
 * Tên điểm tham quan hiển thị trên UI được tự suy ra từ nhãn hotspot loại
 * "area_landmark" đầu tiên trong scene "Trên cao" của mỗi điểm.
 *
 * Chọn điểm qua URL bằng tham số ?q= + SLUG của tên đó (không dấu, gạch ngang):
 *   index.html?q=dinh-tot-dong
 *   index.html?q=quan-ben
 *   index.html?q=quan-dun
 * (vẫn chấp nhận số location id thật như ?q=13 nếu muốn).
 * Không truyền gì thì mặc định vào điểm đầu tiên trong mảng. Không còn topbar
 * hay dropdown đổi điểm trong trang — mỗi điểm dùng 1 link riêng.
 *
 * Viewer vẫn hỗ trợ cấu trúc đơn giản { scenes: [...] } (không phải mảng) để tương thích ngược.
 *
 * ASSET_BASE_URL: nếu ảnh/audio/video trong JSON là đường dẫn tương đối (vd "/media/xxx.jpg"),
 * đặt domain backend ở đây để tự động ghép URL đầy đủ. Để trống nếu JSON đã chứa URL tuyệt đối
 * (như trường hợp hiện tại, ảnh trỏ thẳng tới vr360-builder.metatwin.vn).
 */

window.ASSET_BASE_URL = "";

window.TOUR_DATA = [
  {
    "id": 17,
    "location": 13,
    "version_number": 1,
    "label": "VR360 Virtual Tour",
    "data": {
      "title": "VR360 Virtual Tour",
      "scenes": [
        {
          "id": "dji_20250102020432_0046_d_4",
          "gps": {
            "lat": 20.87835686111111,
            "lng": 105.67312177777778,
            "heading": null,
            "altitude": -40.5
          },
          "info": "",
          "name": "Trên cao",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/DJI_20250102020432_0046_D.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/DJI_20250102020432_0046_D_thumb.webp",
          "hotspots": [
            {
              "id": "area_msrgc3l6_xycxz",
              "icon": null,
              "type": "area_landmark",
              "label": "Đình Tốt Động",
              "style": {
                "fill": "#38bdf8",
                "line": "#ffffff",
                "border": "#38bdf8",
                "opacity": 0.45,
                "hoverFill": "rgba(56, 189, 248, 0.32)",
                "borderWidth": 2,
                "hoverBorder": "#7dd3fc"
              },
              "locked": false,
              "target": "toancanh_dinhtotdong_3",
              "loai_poi": "ghim_dia_danh",
              "metadata": {},
              "noi_dung": null,
              "vertices": [
                {
                  "lat": -32.6,
                  "lon": 93.4
                },
                {
                  "lat": -21.6,
                  "lon": 77.1
                },
                {
                  "lat": -12.8,
                  "lon": 106.2
                },
                {
                  "lat": -16.6,
                  "lon": 120.9
                },
                {
                  "lat": -17.5,
                  "lon": 123.5
                },
                {
                  "lat": -32.8,
                  "lon": 94.3
                }
              ],
              "entryView": null,
              "pointKind": "area_landmark",
              "line_height": 40,
              "overlay_image": "",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              },
              "show_polygon_on_hover": true
            },
            {
              "id": "area_msrgdwvi_zn06o",
              "icon": null,
              "type": "area_landmark",
              "label": "Văn Chỉ",
              "style": {
                "fill": "#38bdf8",
                "line": "#ffffff",
                "border": "#38bdf8",
                "opacity": 0.45,
                "hoverFill": "rgba(56, 189, 248, 0.32)",
                "borderWidth": 2,
                "hoverBorder": "#7dd3fc"
              },
              "locked": false,
              "target": "dji_20250102014337_0029_d_2",
              "loai_poi": "ghim_dia_danh",
              "metadata": {},
              "noi_dung": null,
              "vertices": [
                {
                  "lat": -51.3,
                  "lon": 134.5
                },
                {
                  "lat": -35.7,
                  "lon": 95.1
                },
                {
                  "lat": -16,
                  "lon": 130.9
                },
                {
                  "lat": -20.8,
                  "lon": 150.3
                },
                {
                  "lat": -50.9,
                  "lon": 135.1
                }
              ],
              "entryView": null,
              "pointKind": "area_landmark",
              "line_height": 40,
              "overlay_image": "",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              },
              "show_polygon_on_hover": true
            },
            {
              "id": "area_mssm1hee_ylwaj",
              "icon": null,
              "type": "area_landmark",
              "label": "Thủy Đình",
              "style": {
                "fill": "#38bdf8",
                "line": "#ffffff",
                "border": "#38bdf8",
                "opacity": 0.45,
                "hoverFill": "rgba(56, 189, 248, 0.32)",
                "borderWidth": 2,
                "hoverBorder": "#7dd3fc"
              },
              "locked": false,
              "target": "15",
              "loai_poi": "ghim_dia_danh",
              "metadata": {},
              "noi_dung": null,
              "vertices": [
                {
                  "lat": -41.3,
                  "lon": 56.8
                },
                {
                  "lat": -39.7,
                  "lon": 40.1
                },
                {
                  "lat": -35.9,
                  "lon": 27
                },
                {
                  "lat": -33.2,
                  "lon": 17
                },
                {
                  "lat": -30.8,
                  "lon": 11.3
                },
                {
                  "lat": -29.2,
                  "lon": 9.7
                },
                {
                  "lat": -29.6,
                  "lon": 8.4
                },
                {
                  "lat": -29.4,
                  "lon": 3.5
                },
                {
                  "lat": -27.4,
                  "lon": 0.6
                },
                {
                  "lat": -24.8,
                  "lon": 1.9
                },
                {
                  "lat": -24.7,
                  "lon": 3.7
                },
                {
                  "lat": -23.7,
                  "lon": 4
                },
                {
                  "lat": -22,
                  "lon": 4.9
                },
                {
                  "lat": -21.3,
                  "lon": 6.5
                },
                {
                  "lat": -19.8,
                  "lon": 6.7
                },
                {
                  "lat": -21.5,
                  "lon": 7.1
                },
                {
                  "lat": -21.3,
                  "lon": 8.1
                },
                {
                  "lat": -22,
                  "lon": 8.8
                },
                {
                  "lat": -22.6,
                  "lon": 10.3
                },
                {
                  "lat": -23.7,
                  "lon": 10.3
                },
                {
                  "lat": -25.6,
                  "lon": 12.5
                },
                {
                  "lat": -28.6,
                  "lon": 11.7
                },
                {
                  "lat": -31.7,
                  "lon": 18.7
                },
                {
                  "lat": -33.9,
                  "lon": 28.8
                },
                {
                  "lat": -37.5,
                  "lon": 40.7
                },
                {
                  "lat": -38.8,
                  "lon": 56.5
                },
                {
                  "lat": -41.4,
                  "lon": 57
                }
              ],
              "entryView": null,
              "pointKind": "area_landmark",
              "line_height": 40,
              "overlay_image": "",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              },
              "show_polygon_on_hover": true
            },
            {
              "id": "hs_mssm1ut4_hv8b2",
              "lat": -79.7,
              "lon": 89.6,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "locked": false,
              "target": "3",
              "loai_poi": null,
              "navStyle": "preview_expand",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 100,
            "lat": -33.7,
            "lon": 73.3
          }
        },
        {
          "id": "dji_20250102014337_0029_d_2",
          "gps": {
            "lat": 20.87794336111111,
            "lng": 105.67349558333333,
            "heading": null,
            "altitude": -45.493
          },
          "info": "",
          "name": "Toàn cảnh Văn Chỉ",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/DJI_20250102014337_0029_D.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/DJI_20250102014337_0029_D_thumb.webp",
          "hotspots": [
            {
              "id": "hs_mssr4kdn_d9k84",
              "lat": -37.3,
              "lon": 43.1,
              "icon": "dot",
              "type": "nav",
              "label": "Lối đi 1",
              "locked": false,
              "target": "72",
              "loai_poi": null,
              "navStyle": "preview_expand",
              "entryView": {
                "fov": 70,
                "lat": 0.1,
                "lon": 177.1
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -26.3,
            "lon": 7.9
          }
        },
        {
          "id": "toancanh_dinhtotdong_3",
          "gps": {
            "lat": 20.87789445,
            "lng": 105.67323055,
            "heading": null,
            "altitude": -40.3
          },
          "info": "",
          "name": "Toàn cảnh Đình Tốt Động",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/DJI_20250102015101_0032_D_512Evlr.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/DJI_20250102015101_0032_D_512Evlr_thumb.webp",
          "hotspots": [
            {
              "id": "hs_mssmb8s9_vuznr",
              "lat": -39.8,
              "lon": -79.9,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào Đình Tốt Động",
              "locked": false,
              "target": "27",
              "loai_poi": null,
              "navStyle": "preview_expand",
              "entryView": {
                "fov": 70,
                "lat": 3.6,
                "lon": 347.9
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -28.3,
            "lon": 314.2
          }
        },
        {
          "id": "3",
          "gps": {
            "lat": 20.87830555,
            "lng": 105.67305555,
            "heading": null,
            "altitude": -24.9
          },
          "info": "",
          "name": "Bắt đầu",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_092708_00_437.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_092708_00_437_thumb.webp",
          "hotspots": [
            {
              "id": "nav_3_1",
              "lat": -15.8,
              "lon": 175,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "target": "4",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 5.4,
                "lon": 102.5
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mssn64ya_syfva",
              "lat": 37.5,
              "lon": 22.8,
              "icon": "dot",
              "type": "nav",
              "label": "Lối đi 2",
              "locked": false,
              "target": "dji_20250102020432_0046_d_4",
              "loai_poi": null,
              "navStyle": "preview_expand",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mszto25t_aya7u",
              "lat": -15.1,
              "lon": 43.7,
              "icon": null,
              "type": "info",
              "label": "Hotspot 3",
              "locked": false,
              "target": "",
              "loai_poi": "thong_tin_van_ban",
              "noi_dung": {
                "mo_ta": "dádadasfrggafđfgfsfđ",
                "tieu_de": "fadasda",
                "lien_ket": "",
                "mo_ta_ngan": "sadsdasdasdad",
                "youtube_url": "https://youtu.be/GtmrOux7rgg?si=m2X63gXw9-_rAant",
                "anh_minh_hoa": "",
                "danh_sach_anh": [
                  "https://vr360-builder.metatwin.vn/media/tours/hotspot_info/v17/hs_mszto25t_aya7u/anh-chup-man-hinh-2024-07-03-105111-cae38e29.png",
                  "https://vr360-builder.metatwin.vn/media/tours/hotspot_info/v17/hs_mszto25t_aya7u/anh-chup-man-hinh-2024-07-03-105312-3fff300d.png",
                  "https://vr360-builder.metatwin.vn/media/tours/hotspot_info/v17/hs_mszto25t_aya7u/anh-chup-man-hinh-2024-07-08-101231-c17b9e93.png",
                  "https://vr360-builder.metatwin.vn/media/tours/hotspot_info/v17/hs_mszto25t_aya7u/anh-chup-man-hinh-2024-07-08-101237-83fee308.png"
                ]
              },
              "position": {
                "lat": -15.1,
                "lon": 43.7
              },
              "entryView": null,
              "pointKind": "info",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -7.1,
            "lon": 175.4
          }
        },
        {
          "id": "4",
          "gps": {
            "lat": 20.87819445,
            "lng": 105.67322221666667,
            "heading": null,
            "altitude": -23.3
          },
          "info": "",
          "name": "Cổng vào",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_092846_00_441.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_092846_00_441_thumb.webp",
          "hotspots": [
            {
              "id": "nav_4_1",
              "lat": -5.4,
              "lon": 86.3,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng Thủy đình",
              "target": "15",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 90,
                "lat": 1.5,
                "lon": -183.1
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_4_2",
              "lat": -6.2,
              "lon": 119.9,
              "icon": "dot",
              "type": "nav",
              "label": "Văn chỉ",
              "target": "11",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_4_3",
              "lat": -15.5,
              "lon": -93.3,
              "icon": "dot",
              "type": "nav",
              "label": "Tổng quan",
              "target": "3",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 7.4,
                "lon": 360.1
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mu0l345a_6xfcz",
              "lat": -6.2,
              "lon": 103.6,
              "icon": "dot",
              "type": "nav",
              "label": "Lối đi 4",
              "locked": false,
              "target": "26",
              "navStyle": "default",
              "entryView": null,
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -1.3,
            "lon": 192.4
          }
        },
        {
          "id": "11",
          "gps": {
            "lat": 20.87819445,
            "lng": 105.67319445,
            "heading": null,
            "altitude": -16.2
          },
          "info": "",
          "name": "OV  Văn chỉ",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_093410_00_446.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_093410_00_446_thumb.webp",
          "hotspots": [
            {
              "id": "nav_11_1",
              "lat": -6.3,
              "lon": 22.8,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng Văn chỉ",
              "target": "8",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_11_2",
              "lat": -6,
              "lon": -69.6,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng Văn chỉ",
              "target": "14",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_11_3",
              "lat": -10.5,
              "lon": -146,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng Thủy đình",
              "target": "15",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 90,
                "lat": 2,
                "lon": -183.3
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_11_4",
              "lat": -10.2,
              "lon": 102.9,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "target": "4",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 2.6,
            "lon": -383.3
          }
        },
        {
          "id": "8",
          "gps": null,
          "info": "",
          "name": "Cổng văn 1",
          "group": "default",
          "image": "https://api-dinhtotdong.ditich.metatwin.vn/media/images/IMG_20251226_093111_00_443_jwEkCZH.jpg",
          "thumb": "https://api-dinhtotdong.ditich.metatwin.vn/media/images/Screenshot_2026-02-09_143045.png",
          "hotspots": [
            {
              "id": "nav_8_1",
              "lat": -30.3,
              "lon": 160.7,
              "icon": "dot",
              "type": "nav",
              "label": "Khu Văn chỉ",
              "target": "72",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_8_2",
              "lat": 0.1,
              "lon": 45,
              "icon": "dot",
              "type": "nav",
              "label": "Văn chỉ",
              "target": "11",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_8_3",
              "lat": 0.1,
              "lon": -11.4,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "target": "4",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 120,
            "lat": -5.1,
            "lon": 165.9
          }
        },
        {
          "id": "14",
          "gps": {
            "lat": 20.878083333333333,
            "lng": 105.67336111666667,
            "heading": null,
            "altitude": -14.8
          },
          "info": "",
          "name": "Cổng Văn 2",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_093813_00_449.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_093813_00_449_thumb.webp",
          "hotspots": [
            {
              "id": "nav_14_1",
              "lat": -17.4,
              "lon": 170.6,
              "icon": "dot",
              "type": "nav",
              "label": "Khu Văn chỉ",
              "target": "72",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_14_2",
              "lat": -10.3,
              "lon": -46,
              "icon": "dot",
              "type": "nav",
              "label": "Văn chỉ",
              "target": "11",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_14_3",
              "lat": -10.5,
              "lon": -8.9,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng Thủy đình",
              "target": "15",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 90,
                "lat": -2,
                "lon": -183.1
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -2,
            "lon": 169.3
          }
        },
        {
          "id": "15",
          "gps": {
            "lat": 20.87830555,
            "lng": 105.67336111666667,
            "heading": null,
            "altitude": -17.4
          },
          "info": "",
          "name": "Cổng Thủy đình",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_093901_00_450.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_093901_00_450_thumb.webp",
          "hotspots": [
            {
              "id": "nav_15_1",
              "lat": -22.1,
              "lon": 175.1,
              "icon": "dot",
              "type": "nav",
              "label": "Lối ra Thủy đình",
              "target": "17",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_15_2",
              "lat": -8.4,
              "lon": -85.3,
              "icon": "dot",
              "type": "nav",
              "label": "Khu Đình chính",
              "target": "img_20251226_095247_00_460",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 3.6,
                "lon": 79.9
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_15_3",
              "lat": -7.7,
              "lon": 82.5,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "target": "4",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 100,
                "lat": 2.6,
                "lon": 360.5
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_15_4",
              "lat": -4.6,
              "lon": 46.6,
              "icon": "dot",
              "type": "nav",
              "label": "Văn chỉ",
              "target": "11",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 90,
            "lat": 0.1,
            "lon": 538.6
          }
        },
        {
          "id": "17",
          "gps": {
            "lat": 20.87827777777778,
            "lng": 105.67341666666667,
            "heading": null,
            "altitude": -7
          },
          "info": "",
          "name": "Cầu Thủy đình 2",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_094405_00_453.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_094405_00_453_thumb.webp",
          "hotspots": [
            {
              "id": "nav_17_1",
              "lat": -28.3,
              "lon": 171,
              "icon": "dot",
              "type": "nav",
              "label": "Thủy đình",
              "target": "21",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_17_2",
              "lat": -13,
              "lon": -9.5,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng Thủy đình",
              "target": "15",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 8.8,
                "lon": 358.8
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -0.2,
            "lon": 161.9
          }
        },
        {
          "id": "21",
          "gps": {
            "lat": 20.878666666666668,
            "lng": 105.67344445,
            "heading": null,
            "altitude": -16.5
          },
          "info": "",
          "name": "Trong Thủy đình",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_094900_00_456.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_094900_00_456_thumb.webp",
          "hotspots": [
            {
              "id": "nav_21_1",
              "lat": -30.2,
              "lon": 145.7,
              "icon": "dot",
              "type": "nav",
              "label": "Lối ra Thủy đình",
              "target": "17",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 3.6,
                "lon": 337.4
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 85,
            "lat": -2.9,
            "lon": 173.8
          }
        },
        {
          "id": "26",
          "gps": null,
          "info": "",
          "name": "OV Đình chính - 2",
          "group": "default",
          "image": "https://api-dinhtotdong.ditich.metatwin.vn/media/images/IMG_20251226_095337_00_461_UvtRJTH.jpg",
          "thumb": "https://api-dinhtotdong.ditich.metatwin.vn/media/images/Screenshot_2026-02-09_145715.png",
          "hotspots": [
            {
              "id": "nav_26_1",
              "lat": -18.6,
              "lon": -19.2,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng Thủy đình",
              "target": "img_20251226_095247_00_460",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 85,
                "lat": 5.6,
                "lon": -11.1
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_26_2",
              "lat": -13.5,
              "lon": 161.1,
              "icon": "dot",
              "type": "nav",
              "label": "Sân Đình",
              "target": "27",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -2.4,
            "lon": 161.2
          }
        },
        {
          "id": "27",
          "gps": {
            "lat": 20.878138888888888,
            "lng": 105.67347222222223,
            "heading": null,
            "altitude": -13.4
          },
          "info": "",
          "name": "Sân Đình",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_101339_00_468.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_101339_00_468_thumb.webp",
          "hotspots": [
            {
              "id": "nav_27_1",
              "lat": -11.3,
              "lon": 169,
              "icon": "dot",
              "type": "nav",
              "label": "Khu Đình chính",
              "target": "26",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_27_2",
              "lat": -12.3,
              "lon": -11.4,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Đình",
              "target": "37",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_27_3",
              "lat": -9.1,
              "lon": -100.6,
              "icon": "dot",
              "type": "nav",
              "label": "Gian trái",
              "target": "32",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_27_4",
              "lat": -8.5,
              "lon": 78,
              "icon": "dot",
              "type": "nav",
              "label": "Gian phải",
              "target": "35",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_27_5",
              "lat": 56.2,
              "lon": 177.6,
              "icon": "dot",
              "type": "nav",
              "label": "Tổng quan Đình chính",
              "target": "dji_20250102014337_0029_d_34",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -1.9,
            "lon": 348.8
          }
        },
        {
          "id": "32",
          "gps": {
            "lat": 20.878,
            "lng": 105.67363888333334,
            "heading": null,
            "altitude": -12.6
          },
          "info": "",
          "name": "Gian trái Đình",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_101253_00_467.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_101253_00_467_thumb.webp",
          "hotspots": [
            {
              "id": "nav_32_1",
              "lat": -32.6,
              "lon": -95.3,
              "icon": "dot",
              "type": "nav",
              "label": "Sân Đình",
              "target": "27",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_32_2",
              "lat": -10.2,
              "lon": -119.2,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Đình",
              "target": "37",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -2.6,
            "lon": -197
          }
        },
        {
          "id": "35",
          "gps": null,
          "info": "",
          "name": "Gian phải",
          "group": "default",
          "image": "https://api-dinhtotdong.ditich.metatwin.vn/media/images/IMG_20251226_101714_00_470_lIAvVAU.jpg",
          "thumb": "https://api-dinhtotdong.ditich.metatwin.vn/media/images/IMG_20251226_101714_00_470_lIAvVAU.jpg",
          "hotspots": [
            {
              "id": "nav_35_1",
              "lat": -27.9,
              "lon": 74.7,
              "icon": "dot",
              "type": "nav",
              "label": "Sân Đình",
              "target": "27",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_35_2",
              "lat": -10.7,
              "lon": 115.2,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Đình",
              "target": "37",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -2,
            "lon": 441.8
          }
        },
        {
          "id": "37",
          "gps": {
            "lat": 20.87794445,
            "lng": 105.67352778333333,
            "heading": null,
            "altitude": -13.8
          },
          "info": "",
          "name": "In Đình chính",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_101954_00_472.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_101954_00_472_thumb.webp",
          "hotspots": [
            {
              "id": "nav_37_1",
              "lat": 1.8,
              "lon": 0.4,
              "icon": "dot",
              "type": "nav",
              "label": "Sân Đình",
              "target": "27",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "entryView": {
                "fov": 70,
                "lat": -1,
                "lon": 529.1
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_37_2",
              "lat": -16.7,
              "lon": 99.8,
              "icon": "dot",
              "type": "nav",
              "label": "Tranh tường",
              "target": "39",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_37_3",
              "lat": -17,
              "lon": -97.1,
              "icon": "dot",
              "type": "nav",
              "label": "Tranh tường",
              "target": "38",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_37_4",
              "lat": 1.5,
              "lon": -176.9,
              "icon": "dot",
              "type": "nav",
              "label": "Gian thờ",
              "target": "42",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 0.6,
            "lon": 179.7
          }
        },
        {
          "id": "38",
          "gps": {
            "lat": 20.87794445,
            "lng": 105.67347221666667,
            "heading": null,
            "altitude": -13.3
          },
          "info": "",
          "name": "In ĐC - Phải",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_102121_00_473.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_102121_00_473_thumb.webp",
          "hotspots": [
            {
              "id": "nav_38_1",
              "lat": -32.4,
              "lon": 98.7,
              "icon": "dot",
              "type": "nav",
              "label": "Đình chính",
              "target": "37",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -5.7,
            "lon": -86.8
          }
        },
        {
          "id": "39",
          "gps": {
            "lat": 20.877916666666668,
            "lng": 105.67355555,
            "heading": null,
            "altitude": -13.1
          },
          "info": "",
          "name": "In ĐC - Trái",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_102236_00_475.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_102236_00_475_thumb.webp",
          "hotspots": [
            {
              "id": "nav_39_1",
              "lat": -32.9,
              "lon": -98.4,
              "icon": "dot",
              "type": "nav",
              "label": "Đình chính",
              "target": "37",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 90,
            "lat": -1.5,
            "lon": 84.3
          }
        },
        {
          "id": "42",
          "gps": {
            "lat": 20.877888883333334,
            "lng": 105.67358333333334,
            "heading": null,
            "altitude": -10.4
          },
          "info": "",
          "name": "In ĐC - Gian thờ",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_102401_00_477.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_102401_00_477_thumb.webp",
          "hotspots": [
            {
              "id": "nav_42_1",
              "lat": -33.2,
              "lon": 9.6,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Đình",
              "target": "37",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 3.4,
                "lon": 359.4
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_42_2",
              "lat": 28.5,
              "lon": -175.7,
              "icon": "dot",
              "type": "nav",
              "label": "Gian thờ 2",
              "target": "47",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_42_3",
              "lat": -24.4,
              "lon": 83.8,
              "icon": "dot",
              "type": "nav",
              "label": "Tổ Quốc ghi công",
              "target": "41",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 100,
            "lat": -1.3,
            "lon": -185.8
          }
        },
        {
          "id": "41",
          "gps": {
            "lat": 20.877888883333334,
            "lng": 105.67358333333334,
            "heading": null,
            "altitude": -10.4
          },
          "info": "",
          "name": "In ĐC - Tổ Quốc ghi công",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_102314_00_476.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_102314_00_476_thumb.webp",
          "hotspots": [
            {
              "id": "nav_41_1",
              "lat": -26.4,
              "lon": -121.6,
              "icon": "dot",
              "type": "nav",
              "label": "Gian thờ",
              "target": "42",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_41_2",
              "lat": -30.5,
              "lon": 45.7,
              "icon": "dot",
              "type": "nav",
              "label": "Sau Đình",
              "target": "50",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 4.3,
                "lon": 201.8
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 90,
            "lat": -3.7,
            "lon": -179.4
          }
        },
        {
          "id": "44",
          "gps": {
            "lat": 20.87780555,
            "lng": 105.6735,
            "heading": null,
            "altitude": -12.8
          },
          "info": "",
          "name": "In ĐC - Gian thờ 3",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_102615_00_479.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_102615_00_479_thumb.webp",
          "hotspots": [
            {
              "id": "nav_44_2",
              "lat": -11.3,
              "lon": 30.5,
              "icon": "dot",
              "type": "nav",
              "label": "Gian thờ 3",
              "target": "47",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "entryView": {
                "fov": 70,
                "lat": -0.5,
                "lon": 319.8
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -1,
            "lon": 542.9
          }
        },
        {
          "id": "47",
          "gps": {
            "lat": 20.877861116666665,
            "lng": 105.6735,
            "heading": null,
            "altitude": -14
          },
          "info": "",
          "name": "In ĐC - Gian thờ 2",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_102837_00_482.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_102837_00_482_thumb.webp",
          "hotspots": [
            {
              "id": "nav_47_1",
              "lat": -2.3,
              "lon": -173,
              "icon": "dot",
              "type": "nav",
              "label": "Hậu viện",
              "target": "44",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_47_2",
              "lat": 11.1,
              "lon": -25.7,
              "icon": "dot",
              "type": "nav",
              "label": "Gian thờ",
              "target": "42",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "entryView": {
                "fov": 80,
                "lat": -2.4,
                "lon": -6.6
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -1,
            "lon": 173.5
          }
        },
        {
          "id": "50",
          "gps": {
            "lat": 20.87780555,
            "lng": 105.67361111666666,
            "heading": null,
            "altitude": -16
          },
          "info": "",
          "name": "Out ĐC - Trái",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_103543_00_485.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_103543_00_485_thumb.webp",
          "hotspots": [
            {
              "id": "nav_50_1",
              "lat": -11,
              "lon": -161.8,
              "icon": "dot",
              "type": "nav",
              "label": "Hậu viện",
              "target": "51",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": -0.6,
                "lon": -196.1
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_50_2",
              "lat": -18.9,
              "lon": 6.2,
              "icon": "dot",
              "type": "nav",
              "label": "Đình chính",
              "target": "37",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 4.3,
            "lon": 201.8
          }
        },
        {
          "id": "51",
          "gps": {
            "lat": 20.877666666666666,
            "lng": 105.67358333333334,
            "heading": null,
            "altitude": -12.4
          },
          "info": "",
          "name": "Out ĐC - Behind",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_103753_00_488.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_103753_00_488_thumb.webp",
          "hotspots": [
            {
              "id": "nav_51_1",
              "lat": -26.3,
              "lon": 164.8,
              "icon": "dot",
              "type": "nav",
              "label": "Bia thờ",
              "target": "52",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": -0.1,
                "lon": 175
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_51_3",
              "lat": -12.2,
              "lon": 55.4,
              "icon": "dot",
              "type": "nav",
              "label": "Sân sau",
              "target": "50",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 2.3,
                "lon": 369.6
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -0.6,
            "lon": -196.1
          }
        },
        {
          "id": "52",
          "gps": {
            "lat": 20.877666666666666,
            "lng": 105.67338888333333,
            "heading": null,
            "altitude": -15.5
          },
          "info": "",
          "name": "Out ĐC - Behind 1",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_103836_00_489.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_103836_00_489_thumb.webp",
          "hotspots": [
            {
              "id": "nav_52_1",
              "lat": -26.8,
              "lon": -10.6,
              "icon": "dot",
              "type": "nav",
              "label": "Hậu viện",
              "target": "51",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 1.1,
                "lon": 41.1
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -1.6,
            "lon": 175.5
          }
        },
        {
          "id": "72",
          "gps": {
            "lat": 20.878166666666665,
            "lng": 105.67338888333333,
            "heading": null,
            "altitude": -23.5
          },
          "info": "",
          "name": "Khu Văn chỉ",
          "group": "Văn chỉ",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_110815_00_517.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_110815_00_517_thumb.webp",
          "hotspots": [
            {
              "id": "nav_72_1",
              "lat": -9.9,
              "lon": -145.6,
              "icon": "dot",
              "type": "nav",
              "label": "Sân Văn chỉ",
              "target": "57",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_72_2",
              "lat": -9.5,
              "lon": 75.3,
              "icon": "dot",
              "type": "nav",
              "label": "Văn chỉ",
              "target": "11",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 0.1,
            "lon": 177.1
          }
        },
        {
          "id": "57",
          "gps": {
            "lat": 20.87775,
            "lng": 105.67325,
            "heading": null,
            "altitude": -15.2
          },
          "info": "",
          "name": "Sân Văn chỉ",
          "group": "Văn chỉ",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_105227_00_501.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_105227_00_501_thumb.webp",
          "hotspots": [
            {
              "id": "nav_57_1",
              "lat": -26.3,
              "lon": 161.7,
              "icon": "dot",
              "type": "nav",
              "label": "Gian chính",
              "target": "58",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_57_2",
              "lat": -11.7,
              "lon": -52.1,
              "icon": "dot",
              "type": "nav",
              "label": "Khu Văn chỉ",
              "target": "72",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 2.9,
                "lon": 772.9
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 75,
            "lat": -3.8,
            "lon": 177.7
          }
        },
        {
          "id": "58",
          "gps": {
            "lat": 20.877833333333335,
            "lng": 105.67322221666667,
            "heading": null,
            "altitude": -13.3
          },
          "info": "",
          "name": "Gian chính",
          "group": "Văn chỉ",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_105303_00_502.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_105303_00_502_thumb.webp",
          "hotspots": [
            {
              "id": "nav_58_1",
              "lat": -29.4,
              "lon": 177.7,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Văn chỉ",
              "target": "59",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_58_2",
              "lat": -27,
              "lon": -8.9,
              "icon": "dot",
              "type": "nav",
              "label": "Sân Văn chỉ",
              "target": "57",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 3.8,
                "lon": 356.4
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 90,
            "lat": -0.9,
            "lon": 536.4
          }
        },
        {
          "id": "59",
          "gps": {
            "lat": 20.877833333333335,
            "lng": 105.67325,
            "heading": null,
            "altitude": -14.1
          },
          "info": "",
          "name": "In Văn chỉ",
          "group": "Văn chỉ",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_105351_00_503.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_105351_00_503_thumb.webp",
          "hotspots": [
            {
              "id": "nav_59_1",
              "lat": -30.3,
              "lon": 171.8,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Văn chỉ",
              "target": "62",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_59_2",
              "lat": -25.9,
              "lon": -3.4,
              "icon": "dot",
              "type": "nav",
              "label": "Sân Văn chỉ",
              "target": "57",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 6.6,
                "lon": 357.3
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -1.5,
            "lon": 174.3
          }
        },
        {
          "id": "62",
          "gps": {
            "lat": 20.877722216666665,
            "lng": 105.67327778333333,
            "heading": null,
            "altitude": -11.2
          },
          "info": "",
          "name": "Out Văn chỉ",
          "group": "Văn chỉ",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_105546_00_506.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_105546_00_506_thumb.webp",
          "hotspots": [
            {
              "id": "nav_62_1",
              "lat": -20.4,
              "lon": 169.6,
              "icon": "dot",
              "type": "nav",
              "label": "Ban Công đức",
              "target": "63",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_62_2",
              "lat": -24.2,
              "lon": -21.3,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Văn chỉ",
              "target": "59",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 2.6,
                "lon": 353.1
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "nav_62_3",
              "lat": -13.1,
              "lon": -104.8,
              "icon": "dot",
              "type": "nav",
              "label": "Bia Văn chỉ",
              "target": "66",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 100,
                "lat": -4.9,
                "lon": 178.6
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -3.4,
            "lon": 164
          }
        },
        {
          "id": "63",
          "gps": {
            "lat": 20.877722216666665,
            "lng": 105.67327778333333,
            "heading": null,
            "altitude": -11.2
          },
          "info": "",
          "name": "Văn chỉ - công đức",
          "group": "Văn chỉ",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_105629_00_507.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_105629_00_507_thumb.webp",
          "hotspots": [
            {
              "id": "nav_63_1",
              "lat": -32,
              "lon": -6.8,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Văn chỉ",
              "target": "62",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 4.9,
                "lon": 342.9
              },
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 90,
            "lat": -4.9,
            "lon": 530.7
          }
        },
        {
          "id": "66",
          "gps": {
            "lat": 20.87775,
            "lng": 105.67313888333334,
            "heading": null,
            "altitude": -15.8
          },
          "info": "",
          "name": "Bia Văn chỉ",
          "group": "Văn chỉ",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_105907_00_511.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_105907_00_511_thumb.webp",
          "hotspots": [
            {
              "id": "nav_66_1",
              "lat": -29.5,
              "lon": 49.6,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Văn chỉ",
              "target": "62",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "source_type": "poi",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 100,
            "lat": -5,
            "lon": 179.4
          }
        },
        {
          "id": "68",
          "gps": {
            "lat": 20.878333333333334,
            "lng": 105.67363888333334,
            "heading": null,
            "altitude": -14.9
          },
          "info": "",
          "name": "Cổng phụ",
          "group": "default",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_110101_00_513.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_110101_00_513_thumb.webp",
          "hotspots": [
            {
              "id": "hs_mssobhpp_mvaa8",
              "lat": -12.9,
              "lon": 172.9,
              "icon": "dot",
              "type": "nav",
              "label": "Lối đi 1",
              "locked": false,
              "target": "img_20251226_095247_00_460",
              "loai_poi": null,
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 4,
                "lon": -100.1
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 2.2,
            "lon": -10.3
          }
        },
        {
          "id": "img_20251226_095247_00_460",
          "gps": {
            "lat": 20.87819445,
            "lng": 105.6735,
            "heading": null,
            "altitude": -24.9
          },
          "info": "",
          "name": "Cột cờ",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_095247_00_460.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/thumbnails/IMG_20251226_095247_00_460_thumb.webp",
          "hotspots": [
            {
              "id": "hs_mssock5q_hmshn",
              "lat": -11.7,
              "lon": 75.4,
              "icon": "dot",
              "type": "nav",
              "label": "Lối đi 1",
              "locked": false,
              "target": "68",
              "loai_poi": null,
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 2.2,
                "lon": -10.3
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mssocw91_tci3m",
              "lat": -13.4,
              "lon": 164.9,
              "icon": "dot",
              "type": "nav",
              "label": "Lối đi 2",
              "locked": false,
              "target": "26",
              "loai_poi": null,
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": -2.4,
                "lon": 161.2
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mssoe49w_7adce",
              "lat": -11.6,
              "lon": -102.7,
              "icon": "dot",
              "type": "nav",
              "label": "Lối đi 3",
              "locked": false,
              "target": "15",
              "loai_poi": null,
              "navStyle": "default",
              "entryView": {
                "fov": 70,
                "lat": 7,
                "lon": -267.9
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 75,
            "lat": 0,
            "lon": 0
          }
        }
      ]
    },
    "thumbnail": null,
    "background_audio": null,
    "hotspot_point_logo": null,
    "status": "archived",
    "changelog": "Created from Projects flow.",
    "created_by": 1,
    "created_by_name": "admin",
    "created_at": "2026-08-13T16:47:21.758824+07:00",
    "updated_at": "2026-09-14T08:48:28.730609+07:00"
  }
  ,
  {
    "id": 20,
    "location": 15,
    "version_number": 1,
    "label": "VR360 Virtual Tour",
    "data": {
      "title": "VR360 Virtual Tour",
      "scenes": [
        {
          "id": "dji_20250102061441_0068_d",
          "gps": {
            "lat": 20.877446777777777,
            "lng": 105.6695223888889,
            "heading": null,
            "altitude": 3.799
          },
          "info": "",
          "name": "Trên cao",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/DJI_20250102061441_0068_D.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/DJI_20250102061441_0068_D.jpg",
          "hotspots": [
            {
              "id": "area_mtsgybhl_02end",
              "icon": null,
              "type": "area_landmark",
              "label": "Quán Bến",
              "style": {
                "fill": "#fbbf24",
                "line": "#ffffff",
                "border": "#fbbf24",
                "opacity": 0.45,
                "hoverFill": "rgba(56, 189, 248, 0.32)",
                "borderWidth": 2,
                "hoverBorder": "#7dd3fc"
              },
              "locked": false,
              "target": "1_0",
              "loai_poi": "ghim_dia_danh",
              "metadata": {},
              "noi_dung": null,
              "vertices": [
                {
                  "lat": -37.4,
                  "lon": 123.8
                },
                {
                  "lat": -44.9,
                  "lon": -179
                },
                {
                  "lat": -28.8,
                  "lon": -154.1
                },
                {
                  "lat": -25.7,
                  "lon": -163.5
                },
                {
                  "lat": -24.5,
                  "lon": -171
                },
                {
                  "lat": -28,
                  "lon": 174.1
                },
                {
                  "lat": -24.8,
                  "lon": 130.2
                },
                {
                  "lat": -37.5,
                  "lon": 123.8
                }
              ],
              "entryView": null,
              "pointKind": "area_landmark",
              "line_height": 40,
              "overlay_image": "",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              },
              "show_polygon_on_hover": true
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 80,
            "lat": -7.7,
            "lon": 165.6
          }
        },
        {
          "id": "1_0",
          "gps": {
            "lat": 20.87730555,
            "lng": 105.66988888333333,
            "heading": null,
            "altitude": -17.6
          },
          "info": "",
          "name": "Cổng vào",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150116_00_519.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150116_00_519.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -11.9,
              "lon": 66,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng phụ 1",
              "target": "1_1_1",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -12,
              "lon": -88.1,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng phụ 2",
              "target": "1_2_2",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -25.5,
              "lon": 162.8,
              "icon": "dot",
              "type": "nav",
              "label": "Đường vào",
              "target": "2_3",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mtsg5ndc_3moyd",
              "lat": 36.2,
              "lon": 5.1,
              "icon": "dot",
              "type": "nav",
              "label": "Trên cao",
              "locked": false,
              "target": "dji_20250102061441_0068_d",
              "loai_poi": null,
              "navStyle": "preview_expand",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 80,
            "lat": -1.4,
            "lon": 167.4
          }
        },
        {
          "id": "1_1_1",
          "gps": {
            "lat": 20.877138883333334,
            "lng": 105.66991666666667,
            "heading": null,
            "altitude": -17.2
          },
          "info": "",
          "name": "Cổng phụ 1",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150207_00_520.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150207_00_520.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -12.8,
              "lon": -83.3,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "target": "1_0",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 95,
            "lat": 0,
            "lon": 179
          }
        },
        {
          "id": "1_2_2",
          "gps": {
            "lat": 20.87755555,
            "lng": 105.67,
            "heading": null,
            "altitude": -11
          },
          "info": "",
          "name": "Cổng phụ 2",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150033_00_518.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150033_00_518.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -11.1,
              "lon": 71.3,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "target": "1_0",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 85,
            "lat": -7.8,
            "lon": 175.4
          }
        },
        {
          "id": "2_3",
          "gps": {
            "lat": 20.877361116666666,
            "lng": 105.66980555,
            "heading": null,
            "altitude": -15.8
          },
          "info": "",
          "name": "Đường vào",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150247_00_521.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150247_00_521.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": 7.8,
              "lon": 83.3,
              "icon": "dot",
              "type": "nav",
              "label": "Bia Công Đức",
              "target": "2_1_4",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -7.9,
              "lon": -17.7,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "target": "1_0",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 3.6,
                "lon": 351.5
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -15.5,
              "lon": 167.7,
              "icon": "dot",
              "type": "nav",
              "label": "Sân đình",
              "target": "3_5",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 0.8,
            "lon": 178.5
          }
        },
        {
          "id": "2_1_4",
          "gps": {
            "lat": 20.877416666666665,
            "lng": 105.66986111666667,
            "heading": null,
            "altitude": -18.8
          },
          "info": "",
          "name": "Bia Công Đức",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150322_00_522.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150322_00_522.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -19.3,
              "lon": -11.4,
              "icon": "dot",
              "type": "nav",
              "label": "Đường vào",
              "target": "2_3",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 80,
            "lat": 0.4,
            "lon": 168.9
          }
        },
        {
          "id": "3_5",
          "gps": {
            "lat": 20.877361116666666,
            "lng": 105.66986111666667,
            "heading": null,
            "altitude": -19.4
          },
          "info": "",
          "name": "Sân đình",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150357_00_523.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150357_00_523.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -8.4,
              "lon": -3.2,
              "icon": "dot",
              "type": "nav",
              "label": "Đường vào",
              "target": "2_3",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 5.3,
                "lon": 344.2
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -16.9,
              "lon": -96.4,
              "icon": "dot",
              "type": "nav",
              "label": "Đền (phải)",
              "target": "3_1_6",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -18.7,
              "lon": -156.4,
              "icon": "dot",
              "type": "nav",
              "label": "Bia đá",
              "target": "3_1_3_9",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -16.7,
              "lon": 148,
              "icon": "dot",
              "type": "nav",
              "label": "Đền (trái)",
              "target": "4_10",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 5.7,
            "lon": 185.9
          }
        },
        {
          "id": "3_1_6",
          "gps": {
            "lat": 20.87736111111111,
            "lng": 105.66983333333334,
            "heading": null,
            "altitude": -19.6
          },
          "info": "",
          "name": "Đền (phải)",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150457_00_524.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150457_00_524.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": 1.9,
              "lon": -95.5,
              "icon": "dot",
              "type": "nav",
              "label": "Trong đền (phải)",
              "target": "3_1_1_7",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -17.5,
              "lon": -0.4,
              "icon": "dot",
              "type": "nav",
              "label": "Sân đình",
              "target": "3_5",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -13.6,
              "lon": 169.5,
              "icon": "dot",
              "type": "nav",
              "label": "Sân (phải)",
              "target": "3_1_2_8",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mtsg9an4_s07mq",
              "lat": -2.6,
              "lon": 92,
              "icon": "dot",
              "type": "nav",
              "label": "Lối đi 4",
              "locked": false,
              "target": "3_1_3_9",
              "loai_poi": null,
              "navStyle": "preview_expand",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 0.4,
            "lon": -91
          }
        },
        {
          "id": "3_1_1_7",
          "gps": {
            "lat": 20.87744445,
            "lng": 105.66977778333333,
            "heading": null,
            "altitude": -20.9
          },
          "info": "",
          "name": "Trong đền (phải)",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150539_00_525.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150539_00_525.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -29.2,
              "lon": -51.4,
              "icon": "dot",
              "type": "nav",
              "label": "Đền (phải)",
              "target": "3_1_6",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -3.6,
            "lon": 177.9
          }
        },
        {
          "id": "3_1_2_8",
          "gps": {
            "lat": 20.87755555,
            "lng": 105.66983333333333,
            "heading": null,
            "altitude": -25.7
          },
          "info": "",
          "name": "Sân (phải)",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150621_00_526.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_150621_00_526.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -12.4,
              "lon": 4.8,
              "icon": "dot",
              "type": "nav",
              "label": "Đền (phải)",
              "target": "3_1_6",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 3.8,
                "lon": -1.4
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -2.9,
              "lon": 53.4,
              "icon": "dot",
              "type": "nav",
              "label": "Bia đá",
              "target": "3_1_3_9",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 1,
            "lon": -150.9
          }
        },
        {
          "id": "3_1_3_9",
          "gps": {
            "lat": 20.87738888333333,
            "lng": 105.66980555,
            "heading": null,
            "altitude": -22.9
          },
          "info": "",
          "name": "Bia đá",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151007_00_529.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151007_00_529.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -16.4,
              "lon": 51.9,
              "icon": "dot",
              "type": "nav",
              "label": "Sân đình",
              "target": "3_5",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -16,
              "lon": 11.4,
              "icon": "dot",
              "type": "nav",
              "label": "Đền (phải)",
              "target": "3_1_6",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -12.8,
              "lon": -67.1,
              "icon": "dot",
              "type": "nav",
              "label": "Sân (phải)",
              "target": "3_1_2_8",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -1.4,
            "lon": 182.2
          }
        },
        {
          "id": "4_10",
          "gps": {
            "lat": 20.877277783333334,
            "lng": 105.66977778333333,
            "heading": null,
            "altitude": -22.5
          },
          "info": "",
          "name": "Đền (trái)",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151108_00_531.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151108_00_531.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -17,
              "lon": 148.1,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Đền (trái)",
              "target": "4_1_11",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -14.1,
              "lon": -103.7,
              "icon": "dot",
              "type": "nav",
              "label": "Sân (trái)",
              "target": "5_4_18",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -16.3,
              "lon": 104.8,
              "icon": "dot",
              "type": "nav",
              "label": "Sân đình",
              "target": "3_5",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 4.5,
                "lon": 232.7
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 0.8,
            "lon": 153.1
          }
        },
        {
          "id": "4_1_11",
          "gps": {
            "lat": 20.877277777777778,
            "lng": 105.66980555555556,
            "heading": null,
            "altitude": -26
          },
          "info": "",
          "name": "Trong Đền (trái)",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151152_00_532.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151152_00_532.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": 15.6,
              "lon": 154.9,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Đền (trái) - 1",
              "target": "4_1_2_12",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -29.8,
              "lon": 62.2,
              "icon": "dot",
              "type": "nav",
              "label": "Đền (trái)",
              "target": "4_10",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 80,
            "lat": -2,
            "lon": 165.3
          }
        },
        {
          "id": "4_1_2_12",
          "gps": {
            "lat": 20.877277777777778,
            "lng": 105.66983333333334,
            "heading": null,
            "altitude": -20.1
          },
          "info": "",
          "name": "Trong Đền (trái) - 1",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151405_00_535.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151405_00_535.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": 7.7,
              "lon": 134.8,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Đền (trái) - 2",
              "target": "4_1_3_13",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": 10.2,
              "lon": -18.8,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Đền (trái)",
              "target": "4_1_11",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "noi_dung": null,
              "entryView": {
                "fov": 80,
                "lat": -2.2,
                "lon": 397.7
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 80,
            "lat": -3.6,
            "lon": 173.7
          }
        },
        {
          "id": "4_1_3_13",
          "gps": {
            "lat": 20.877277777777778,
            "lng": 105.66983333333334,
            "heading": null,
            "altitude": -23.4
          },
          "info": "",
          "name": "Trong Đền (trái) - 2",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151334_00_534.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151334_00_534.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -34.5,
              "lon": 2.6,
              "icon": "dot",
              "type": "nav",
              "label": "Trong Đền (trái) - 1",
              "target": "4_1_2_12",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 80,
                "lat": -0.7,
                "lon": 352.1
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 80,
            "lat": -2.7,
            "lon": 198.6
          }
        },
        {
          "id": "5_1_14",
          "gps": {
            "lat": 20.877222216666667,
            "lng": 105.66980555,
            "heading": null,
            "altitude": -19.9
          },
          "info": "",
          "name": "Sân (trái) - 1",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151700_00_539.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151700_00_539.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -25.9,
              "lon": 85.6,
              "icon": "dot",
              "type": "nav",
              "label": "Nhà chờ",
              "target": "5_2_15",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -18.2,
              "lon": -154.5,
              "icon": "dot",
              "type": "nav",
              "label": "Đền (trái)",
              "target": "4_10",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -19.2,
              "lon": 148,
              "icon": "dot",
              "type": "nav",
              "label": "Sân (trái)",
              "target": "5_4_18",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -3.1,
            "lon": 107.1
          }
        },
        {
          "id": "5_2_15",
          "gps": {
            "lat": 20.877166666666668,
            "lng": 105.66975000000001,
            "heading": null,
            "altitude": -22.6
          },
          "info": "",
          "name": "Nhà chờ",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151830_00_542.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151830_00_542.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -19,
              "lon": 167.9,
              "icon": "dot",
              "type": "nav",
              "label": "Tổ Quốc ghi Công",
              "target": "5_2_1_16",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -23.4,
              "lon": -5.3,
              "icon": "dot",
              "type": "nav",
              "label": "Sân (trái)",
              "target": "5_4_18",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -15.7,
              "lon": 88.3,
              "icon": "dot",
              "type": "nav",
              "label": "Sân (trái) - 1",
              "target": "5_1_14",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 6.4,
                "lon": 189.6
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": 5.2,
              "lon": -97.8,
              "icon": "dot",
              "type": "nav",
              "label": "Tranh tường",
              "target": "5_3_17",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -2.7,
            "lon": 172.2
          }
        },
        {
          "id": "5_2_1_16",
          "gps": {
            "lat": 20.877222222222223,
            "lng": 105.66983333333334,
            "heading": null,
            "altitude": -21.8
          },
          "info": "",
          "name": "Tổ Quốc Ghi Công",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151854_00_543.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151854_00_543.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -26.8,
              "lon": -12.9,
              "icon": "dot",
              "type": "nav",
              "label": "Nhà chờ",
              "target": "5_2_15",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 2.1,
                "lon": 348.7
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 85,
            "lat": -6.8,
            "lon": -196.2
          }
        },
        {
          "id": "5_3_17",
          "gps": {
            "lat": 20.877083333333335,
            "lng": 105.66983333333334,
            "heading": null,
            "altitude": -21.7
          },
          "info": "",
          "name": "Tranh tường",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_152010_00_546.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_152010_00_546.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -15.4,
              "lon": -59.2,
              "icon": "dot",
              "type": "nav",
              "label": "Sân (trái)",
              "target": "5_4_18",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -23.9,
              "lon": -10.2,
              "icon": "dot",
              "type": "nav",
              "label": "Nhà chờ",
              "target": "5_2_15",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 3,
                "lon": 83.1
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 1.5,
            "lon": 155.8
          }
        },
        {
          "id": "5_4_18",
          "gps": {
            "lat": 20.877222222222223,
            "lng": 105.66980555555556,
            "heading": null,
            "altitude": -21
          },
          "info": "",
          "name": "Sân (trái)",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151730_00_540.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_151730_00_540.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -14.2,
              "lon": 27.6,
              "icon": "dot",
              "type": "nav",
              "label": "Nhờ chờ",
              "target": "5_2_15",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -8,
              "lon": -17.4,
              "icon": "dot",
              "type": "nav",
              "label": "Sân (trái) - 1",
              "target": "5_1_14",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": 4,
              "lon": 58.8,
              "icon": "dot",
              "type": "nav",
              "label": "Tranh tường",
              "target": "5_3_17",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -14.2,
              "lon": -75.4,
              "icon": "dot",
              "type": "nav",
              "label": "Đền (trái)",
              "target": "4_10",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 2.9,
            "lon": 31.2
          }
        }
      ]
    },
    "thumbnail": null,
    "background_audio": null,
    "hotspot_point_logo": null,
    "status": "draft",
    "changelog": "Created from Projects flow.",
    "created_by": 1,
    "created_by_name": "admin",
    "created_at": "2026-09-07T12:26:19.953959+07:00",
    "updated_at": "2026-09-09T08:58:25.289143+07:00"
  },
  {
    "id": 21,
    "location": 16,
    "version_number": 1,
    "label": "VR360 Virtual Tour",
    "data": {
      "title": "VR360 Virtual Tour",
      "scenes": [
        {
          "id": "dji_20250102065632_0084_d",
          "gps": null,
          "info": "",
          "name": "Trên cao",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/DJI_20250102065632_0084_D.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/DJI_20250102065632_0084_D.jpg",
          "hotspots": [
            {
              "id": "area_mtth1pws_zri1d",
              "icon": null,
              "type": "area_landmark",
              "label": "Quán Đừn",
              "style": {
                "fill": "#38bdf8",
                "line": "#ffffff",
                "border": "#38bdf8",
                "opacity": 0.45,
                "hoverFill": "rgba(56, 189, 248, 0.32)",
                "borderWidth": 2,
                "hoverBorder": "#7dd3fc"
              },
              "locked": false,
              "target": "1_0",
              "loai_poi": "ghim_dia_danh",
              "metadata": {},
              "noi_dung": null,
              "vertices": [
                {
                  "lat": -44.8,
                  "lon": 148.8
                },
                {
                  "lat": -32.6,
                  "lon": 19.9
                },
                {
                  "lat": -33.4,
                  "lon": -33.7
                },
                {
                  "lat": -44.8,
                  "lon": -73.7
                },
                {
                  "lat": -41.7,
                  "lon": -122.8
                },
                {
                  "lat": -49.2,
                  "lon": -137.8
                },
                {
                  "lat": -44.2,
                  "lon": -146.7
                },
                {
                  "lat": -45.9,
                  "lon": -166.1
                },
                {
                  "lat": -45.7,
                  "lon": 170.9
                },
                {
                  "lat": -44.7,
                  "lon": 148.6
                }
              ],
              "entryView": null,
              "pointKind": "area_landmark",
              "line_height": 41,
              "overlay_image": "",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              },
              "show_polygon_on_hover": true
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 120,
            "lat": -65.6,
            "lon": -26.7
          }
        },
        {
          "id": "1_0",
          "gps": {
            "lat": 20.879527783333334,
            "lng": 105.66802778333333,
            "heading": null,
            "altitude": -23.3
          },
          "info": "",
          "name": "Bắt đầu",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_155914_00_548.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_155914_00_548.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -12.4,
              "lon": 175.2,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "target": "2_1",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mttie2bo_gib7g",
              "lat": 30.2,
              "lon": 20.9,
              "icon": "dot",
              "type": "nav",
              "label": "Trên cao",
              "locked": false,
              "target": "dji_20250102065632_0084_d",
              "loai_poi": null,
              "navStyle": "preview_expand",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 5.5,
            "lon": 175.4
          }
        },
        {
          "id": "2_1",
          "gps": {
            "lat": 20.87955555,
            "lng": 105.66786111666667,
            "heading": null,
            "altitude": -24.3
          },
          "info": "",
          "name": "Cổng vào",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160058_00_549.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160058_00_549.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -22.5,
              "lon": -175.2,
              "icon": "dot",
              "type": "nav",
              "label": "Lối vào",
              "target": "3_2",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -11.3,
              "lon": 10.8,
              "icon": "dot",
              "type": "nav",
              "label": "Bắt đầu",
              "target": "1_0",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 9.6,
                "lon": 1.8
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -0.2,
            "lon": 185.4
          }
        },
        {
          "id": "3_2",
          "gps": {
            "lat": 20.879583333333333,
            "lng": 105.66766666666666,
            "heading": null,
            "altitude": -24
          },
          "info": "",
          "name": "Lối vào",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160256_00_551.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160256_00_551.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -15.5,
              "lon": -169.9,
              "icon": "dot",
              "type": "nav",
              "label": "Sân",
              "target": "4_3",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -10,
              "lon": 16.3,
              "icon": "dot",
              "type": "nav",
              "label": "Cổng vào",
              "target": "2_1",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 10.9,
                "lon": 13
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 5.1,
            "lon": 190.9
          }
        },
        {
          "id": "4_3",
          "gps": {
            "lat": 20.879583333333333,
            "lng": 105.66755555,
            "heading": null,
            "altitude": -21.4
          },
          "info": "",
          "name": "Sân trước",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160324_00_552.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160324_00_552.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -16.2,
              "lon": -176.1,
              "icon": "dot",
              "type": "nav",
              "label": "Sân chính",
              "target": "5_4",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -14.4,
              "lon": 6.5,
              "icon": "dot",
              "type": "nav",
              "label": "Lối ra",
              "target": "3_2",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 9.4,
                "lon": 13.2
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 6.8,
            "lon": 542.5
          }
        },
        {
          "id": "5_4",
          "gps": {
            "lat": 20.8795,
            "lng": 105.6675,
            "heading": null,
            "altitude": -24.6
          },
          "info": "",
          "name": "Sân chính",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160400_00_553.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160400_00_553.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -23.7,
              "lon": -174.3,
              "icon": "dot",
              "type": "nav",
              "label": "Gian thờ",
              "target": "6_5",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -14.3,
              "lon": -88.8,
              "icon": "dot",
              "type": "nav",
              "label": "Sân bên",
              "target": "9_8",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -12,
              "lon": 96.5,
              "icon": "dot",
              "type": "nav",
              "label": "Sân trước",
              "target": "4_3",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": 11.4,
                "lon": 368.4
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -0.8,
            "lon": -174.8
          }
        },
        {
          "id": "6_5",
          "gps": {
            "lat": 20.879527783333334,
            "lng": 105.66758333333334,
            "heading": null,
            "altitude": -23.5
          },
          "info": "",
          "name": "Gian thờ",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160435_00_554.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160435_00_554.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -32.6,
              "lon": 167,
              "icon": "dot",
              "type": "nav",
              "label": "Gian thờ trong",
              "target": "7_6",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -32.8,
              "lon": -3.7,
              "icon": "dot",
              "type": "nav",
              "label": "Sân chính",
              "target": "5_4",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -4,
            "lon": -185.1
          }
        },
        {
          "id": "7_6",
          "gps": {
            "lat": 20.87955555,
            "lng": 105.66747221666667,
            "heading": null,
            "altitude": -23.4
          },
          "info": "",
          "name": "Gian thờ trong",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160505_00_555.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160505_00_555.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": 29.4,
              "lon": 148.8,
              "icon": "dot",
              "type": "nav",
              "label": "Gian thờ trong",
              "target": "img_20251226_160528_00_556",
              "loai_poi": "chuyen_canh",
              "navStyle": "preview_expand",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -29.2,
              "lon": 82.5,
              "icon": "dot",
              "type": "nav",
              "label": "Sân chính",
              "target": "6_5",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": {
                "fov": 70,
                "lat": -1.6,
                "lon": -365.2
              },
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 90,
            "lat": -3.3,
            "lon": -191.6
          }
        },
        {
          "id": "img_20251226_160528_00_556",
          "gps": {
            "lat": 20.8795,
            "lng": 105.6675,
            "heading": null,
            "altitude": -21.4
          },
          "info": "",
          "name": "Đằng sau gian thờ trong",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160528_00_556.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160528_00_556.jpg",
          "hotspots": [
            {
              "id": "hs_mttjpi3e_1tio9",
              "lat": 1.8,
              "lon": -35.4,
              "icon": "dot",
              "type": "nav",
              "label": "Lối đi 1",
              "locked": false,
              "target": "7_6",
              "navStyle": "preview_expand",
              "entryView": {
                "fov": 90,
                "lat": 4.4,
                "lon": -302.6
              },
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 85,
            "lat": -2.8,
            "lon": -129.1
          }
        },
        {
          "id": "9_8",
          "gps": null,
          "info": "",
          "name": "Sân bên",
          "group": "Mặc định",
          "image": "https://storage.vanmanhit.com/uploads/panoramas/9_1771613094246_5e35f1.jpg",
          "thumb": "https://storage.vanmanhit.com/uploads/thumbnails/9_1771613094246_5e35f1.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -8,
              "lon": 1.1,
              "icon": "dot",
              "type": "nav",
              "label": "Sân chính",
              "target": "5_4",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hotspot",
              "lat": -7.4,
              "lon": 79.4,
              "icon": "dot",
              "type": "nav",
              "label": "Sân sau",
              "target": "10_9",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 7.4,
            "lon": 43.2
          }
        },
        {
          "id": "10_9",
          "gps": {
            "lat": 20.8795,
            "lng": 105.66747221666667,
            "heading": null,
            "altitude": -20.8
          },
          "info": "",
          "name": "Sân sau",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160700_00_559.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160700_00_559.jpg",
          "hotspots": [
            {
              "id": "hotspot",
              "lat": -19,
              "lon": -20.6,
              "icon": "dot",
              "type": "nav",
              "label": "Sân bên",
              "target": "9_8",
              "loai_poi": "chuyen_canh",
              "navStyle": "default",
              "noi_dung": null,
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mtti7fr5_gihip",
              "lat": -13.7,
              "lon": 149.3,
              "icon": "dot",
              "type": "nav",
              "label": "Phía trên sân",
              "locked": false,
              "target": "img_20251226_160750_00_561",
              "loai_poi": null,
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mtti7hon_ft29g",
              "lat": -18.5,
              "lon": -127.3,
              "icon": "dot",
              "type": "nav",
              "label": "Lán",
              "locked": false,
              "target": "img_20251226_160719_00_560",
              "loai_poi": null,
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 2.1,
            "lon": -172.6
          }
        },
        {
          "id": "img_20251226_160719_00_560",
          "gps": {
            "lat": 20.8795,
            "lng": 105.66733333333333,
            "heading": null,
            "altitude": -19.4
          },
          "info": "",
          "name": "Lán tại sân sau",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160719_00_560.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160719_00_560.jpg",
          "hotspots": [
            {
              "id": "hs_mtti7yhh_c0q2n",
              "lat": -20.9,
              "lon": 116,
              "icon": "dot",
              "type": "nav",
              "label": "Sân ",
              "locked": false,
              "target": "10_9",
              "loai_poi": null,
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            },
            {
              "id": "hs_mtti82u6_424rb",
              "lat": -12.1,
              "lon": 162.2,
              "icon": "dot",
              "type": "nav",
              "label": "Phía trên sân",
              "locked": false,
              "target": "img_20251226_160750_00_561",
              "loai_poi": null,
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": -2.7,
            "lon": 122
          }
        },
        {
          "id": "img_20251226_160750_00_561",
          "gps": {
            "lat": 20.87944445,
            "lng": 105.66738888333333,
            "heading": null,
            "altitude": -21.6
          },
          "info": "",
          "name": "Phía trên sân sau",
          "group": "Mặc định",
          "image": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160750_00_561.jpg",
          "thumb": "https://vr360-builder.metatwin.vn/media/scenes/originals/IMG_20251226_160750_00_561.jpg",
          "hotspots": [
            {
              "id": "hs_mtti96vk_8gemb",
              "lat": -14.4,
              "lon": -0.6,
              "icon": "dot",
              "type": "nav",
              "label": "Sân",
              "locked": false,
              "target": "10_9",
              "loai_poi": null,
              "navStyle": "default",
              "entryView": null,
              "pointKind": "nav",
              "khi_dua_chuot_vao": {
                "van_ban_huong_dan": "",
                "duong_dan_thumbnail": "",
                "hien_thi_anh_thu_nho": false
              }
            }
          ],
          "transition": {
            "speed": 10,
            "effect": "fade",
            "enabled": true,
            "duration": 1200,
            "rotation": true
          },
          "initialView": {
            "fov": 70,
            "lat": 10.6,
            "lon": -4.1
          }
        }
      ]
    },
    "thumbnail": null,
    "background_audio": null,
    "hotspot_point_logo": null,
    "status": "draft",
    "changelog": "Created from Projects flow.",
    "created_by": 1,
    "created_by_name": "admin",
    "created_at": "2026-09-07T12:29:55.338709+07:00",
    "updated_at": "2026-09-09T10:50:56.682047+07:00"
  }
];

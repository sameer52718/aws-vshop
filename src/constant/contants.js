export const fuelType = [
  { id: 0, name: "" },
  { id: 1, name: "Gasoline (Petrol)" },
  { id: 2, name: "Diesel" },
  { id: 3, name: "Electric" },
  { id: 4, name: "Hybrid (Gasoline/Electric)" },
  { id: 5, name: "Plug-in Hybrid (PHEV)" },
  { id: 6, name: "Compressed Natural Gas (CNG)" },
  { id: 7, name: "Liquefied Petroleum Gas (LPG)" },
  { id: 8, name: "Ethanol (E85)" },
  { id: 9, name: "Biodiesel" },
  { id: 10, name: "Hydrogen" },
  { id: 11, name: "Flex Fuel (E85/Ethanol blend)" },
  { id: 12, name: "Propane" },
  { id: 13, name: "Methanol" },
  { id: 14, name: "Bioethanol" },
  { id: 15, name: "Dual Fuel (Diesel/Natural Gas)" },
  { id: 16, name: "Biogas" },
  { id: 17, name: "Synthetic Fuel" },
  { id: 18, name: "Kerosene" },
  { id: 19, name: "Wood Gas" },
  { id: 20, name: "Coal Gas" },
];

export const bodyCondition = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
  { id: 7, name: "7" },
  { id: 8, name: "8" },
  { id: 9, name: "9" },
  { id: 10, name: "10" },
];

export const doors = [
  { id: 1, name: "2 Doors" },
  { id: 2, name: "3 Doors" },
  { id: 3, name: "4 Doors" },
  { id: 4, name: "5 Doors" },
  { id: 5, name: "6 Doors" },
];

export const transmissionType = [
  { id: 0, name: "" },
  { id: 1, name: "Automatic" },
  { id: 2, name: "Manual (Standard)" },
  { id: 3, name: "Continuously Variable Transmission (CVT)" },
  { id: 4, name: "Semi-Automatic" },
  { id: 5, name: "Dual-Clutch Transmission (DCT)" },
  { id: 6, name: "Automated Manual Transmission (AMT)" },
  { id: 7, name: "Tiptronic" },
  { id: 8, name: "Direct-Shift Gearbox (DSG)" },
  { id: 9, name: "Electronically Controlled Transmission (ECT)" },
  { id: 10, name: "Hydrostatic Transmission" },
  { id: 11, name: "Infinitely Variable Transmission (IVT)" },
  { id: 12, name: "Automated Sequential Gearbox" },
  { id: 13, name: "Sequential Manual Transmission (SMT)" },
  { id: 14, name: "Sportshift" },
  { id: 15, name: "Geartronic" },
  { id: 16, name: "SelectShift" },
  { id: 17, name: "e-CVT (Electric Continuously Variable Transmission)" },
  { id: 18, name: "PowerShift" },
  { id: 19, name: "Steptronic" },
  { id: 20, name: "Shift-By-Wire (SBW) Transmission" },
];

export const bodyType = [
  { id: 1, name: "Sedan" },
  { id: 2, name: "SUV (Sport Utility Vehicle)" },
  { id: 3, name: "Truck" },
  { id: 4, name: "Coupe" },
  { id: 5, name: "Convertible" },
  { id: 6, name: "Hatchback" },
  { id: 7, name: "Wagon" },
  { id: 8, name: "Van" },
  { id: 9, name: "Crossover" },
  { id: 10, name: "Minivan" },
  { id: 11, name: "Pickup" },
  { id: 12, name: "Roadster" },
  { id: 13, name: "Limousine" },
  { id: 14, name: "Convertible SUV" },
  { id: 15, name: "Coupe SUV" },
  { id: 16, name: "Extended Cab Truck" },
  { id: 17, name: "Crew Cab Truck" },
  { id: 18, name: "Double Cab Truck" },
  { id: 19, name: "Regular Cab Truck" },
  { id: 20, name: "Electric Vehicle (EV)" },
  { id: 21, name: "Hybrid" },
  { id: 22, name: "Plug-in Hybrid (PHEV)" },
];

export const makeTypes = [
  { name: "Toyota", id: 1 },
  { name: "BMW", id: 2 },
  { name: "Audi", id: 3 },
];

export const modelTypes = [
  { name: "Audi R8", id: 1 },
  { name: "BMW", id: 2 },
  { name: "Grande", id: 3 },
  { name: "Corrolla", id: 4 },
];

export const features = [
  {
    field: "anti_lock_braking_system",
    label: "Anti lock braking system",
    id: 1,
  },
  {
    field: "traction_control",
    label: "Traction control",
    id: 2,
  },
  {
    field: "stability_control",
    label: "Stability control",
    id: 3,
  },
  {
    field: "airbags",
    label: "Airbags",
    id: 4,
  },
  {
    field: "backup_camera",
    label: "Backup camera",
    id: 5,
  },
  {
    field: "blind_spot_monitoring",
    label: "Blind spot monitoring",
    id: 6,
  },
  {
    field: "lane_departure_warning",
    label: "Lane departure warning",
    id: 7,
  },
  {
    field: "forward_collision_warning",
    label: "Forward collision warning",
    id: 8,
  },
  {
    field: "automatic_emergency_braking",
    label: "Automatic emergency braking",
    id: 9,
  },
  {
    field: "adaptive_cruise_control",
    label: "Adaptive cruise control",
    id: 10,
  },
  {
    field: "parking_sensors",
    label: "Parking sensors",
    id: 11,
  },
  {
    field: "keyless_entry",
    label: "Keyless entry",
    id: 12,
  },
  {
    field: "push_button_start_stop",
    label: "Push button start stop",
    id: 13,
  },
  {
    field: "power_windows",
    label: "Power windows",
    id: 14,
  },
  {
    field: "power_door_locks",
    label: "Power door locks",
    id: 15,
  },
  {
    field: "power_mirrors",
    label: "Power mirrors",
    id: 16,
  },
  {
    field: "power_seats",
    label: "Power seats",
    id: 17,
  },
  {
    field: "heated_seats",
    label: "Heated seats",
    id: 18,
  },
  {
    field: "ventilated_seats",
    label: "Ventilated seats",
    id: 19,
  },
  {
    field: "memory_seats",
    label: "Memory seats",
    id: 20,
  },
  {
    field: "leather_seats",
    label: "Leather seats",
    id: 21,
  },
  {
    field: "cloth_seats",
    label: "Cloth seats",
    id: 22,
  },
  {
    field: "sunroof_moonroof",
    label: "Sunroof moonroof",
    id: 23,
  },
  {
    field: "panoramic_sunroof",
    label: "Panoramic sunroof",
    id: 24,
  },
  {
    field: "roof_rack",
    label: "Roof rack",
    id: 25,
  },
  {
    field: "tinted_windows",
    label: "Tinted windows",
    id: 26,
  },
  {
    field: "led_headlights",
    label: "Led headlights",
    id: 27,
  },
  {
    field: "daytime_running_lights",
    label: "Daytime running lights",
    id: 28,
  },
  {
    field: "fog_lights",
    label: "Fog lights",
    id: 29,
  },
  {
    field: "automatic_headlights",
    label: "Automatic headlights",
    id: 30,
  },
  {
    field: "head_up_display_hud",
    label: "Head up display hud",
    id: 31,
  },
  {
    field: "touchscreen_infotainment_system",
    label: "Touchscreen infotainment system",
    id: 32,
  },
  {
    field: "apple_carplay",
    label: "Apple carplay",
    id: 33,
  },
  {
    field: "android_auto",
    label: "Android auto",
    id: 34,
  },
  {
    field: "bluetooth_connectivity",
    label: "Bluetooth connectivity",
    id: 35,
  },
  {
    field: "usb_ports",
    label: "Usb ports",
    id: 36,
  },
  {
    field: "auxiliary_input",
    label: "Auxiliary input",
    id: 37,
  },
  {
    field: "wireless_charging",
    label: "Wireless charging",
    id: 38,
  },
  {
    field: "navigation_system",
    label: "Navigation system",
    id: 39,
  },
  {
    field: "voice_recognition_system",
    label: "Voice recognition system",
    id: 40,
  },
  {
    field: "wi_fi_hotspot",
    label: "Wi fi hotspot",
    id: 41,
  },
  {
    field: "satellite_radio",
    label: "Satellite radio",
    id: 42,
  },
  {
    field: "am_fm_radio",
    label: "Am fm radio",
    id: 43,
  },
  {
    field: "cd_player",
    label: "Cd player",
    id: 44,
  },
  {
    field: "dvd_player",
    label: "Dvd player",
    id: 45,
  },
  {
    field: "mp3_player",
    label: "Mp3 player",
    id: 46,
  },
  {
    field: "surround_sound_system",
    label: "Surround sound system",
    id: 47,
  },
  {
    field: "subwoofer",
    label: "Subwoofer",
    id: 48,
  },
  {
    field: "dual_zone_climate_control",
    label: "Dual zone climate control",
    id: 49,
  },
  {
    field: "rear_climate_control",
    label: "Rear climate control",
    id: 50,
  },
  {
    field: "heated_steering_wheel",
    label: "Heated steering wheel",
    id: 51,
  },
  {
    field: "power_tailgate_trunk",
    label: "Power tailgate trunk",
    id: 52,
  },
  {
    field: "hands_free_liftgate",
    label: "Hands free liftgate",
    id: 53,
  },
  {
    field: "fold_flat_seats",
    label: "Fold flat seats",
    id: 54,
  },
  {
    field: "third_row_seating",
    label: "Third row seating",
    id: 55,
  },
  {
    field: "cargo_cover",
    label: "Cargo cover",
    id: 56,
  },
  {
    field: "cargo_organizer",
    label: "Cargo organizer",
    id: 57,
  },
  {
    field: "trailer_hitch",
    label: "Trailer hitch",
    id: 58,
  },
  {
    field: "trailer_brake_controller",
    label: "Trailer brake controller",
    id: 59,
  },
  {
    field: "all_wheel_drive_awd",
    label: "All wheel drive awd",
    id: 60,
  },
  {
    field: "four_wheel_drive_4wd",
    label: "Four wheel drive 4wd",
    id: 61,
  },
  {
    field: "front_wheel_drive_fwd",
    label: "Front wheel drive fwd",
    id: 62,
  },
  {
    field: "rear_wheel_drive_rwd",
    label: "Rear wheel drive rwd",
    id: 63,
  },
  {
    field: "adaptive_suspension",
    label: "Adaptive suspension",
    id: 64,
  },
  {
    field: "off_road_package",
    label: "Off road package",
    id: 65,
  },
  {
    field: "tow_package",
    label: "Tow package",
    id: 66,
  },
  {
    field: "sport_package",
    label: "Sport package",
    id: 67,
  },
  {
    field: "performance_package",
    label: "Performance package",
    id: 68,
  },
  {
    field: "eco_mode",
    label: "Eco mode",
    id: 69,
  },
  {
    field: "hybrid_electric_drive",
    label: "Hybrid electric drive",
    id: 70,
  },
  {
    field: "regenerative_braking",
    label: "Regenerative braking",
    id: 71,
  },
  {
    field: "auto_start_stop_system",
    label: "Auto start stop system",
    id: 72,
  },
  {
    field: "eco_driving_assist",
    label: "Eco driving assist",
    id: 73,
  },
  {
    field: "remote_engine_start",
    label: "Remote engine start",
    id: 74,
  },
  {
    field: "teen_driver_mode",
    label: "Teen driver mode",
    id: 75,
  },
  {
    field: "auto_dimming_rearview_mirror",
    label: "Auto dimming rearview mirror",
    id: 76,
  },
  {
    field: "rain_sensing_wipers",
    label: "Rain sensing wipers",
    id: 77,
  },
  {
    field: "heated_windshield",
    label: "Heated windshield",
    id: 78,
  },
  {
    field: "heated_side_mirrors",
    label: "Heated side mirrors",
    id: 79,
  },
  {
    field: "power_folding_mirrors",
    label: "Power folding mirrors",
    id: 80,
  },
  {
    field: "auto_dimming_side_mirrors",
    label: "Auto dimming side mirrors",
    id: 81,
  },
  {
    field: "security_system",
    label: "Security system",
    id: 82,
  },
  {
    field: "vehicle_tracking_system",
    label: "Vehicle tracking system",
    id: 83,
  },
  {
    field: "remote_locking_unlocking",
    label: "Remote locking unlocking",
    id: 84,
  },
  {
    field: "anti_theft_alarm",
    label: "Anti theft alarm",
    id: 85,
  },
  {
    field: "tire_pressure_monitoring_system_tpms",
    label: "Tire pressure monitoring system tpms",
    id: 86,
  },
  {
    field: "spare_tire",
    label: "Spare tire",
    id: 87,
  },
  {
    field: "run_flat_tires",
    label: "Run flat tires",
    id: 88,
  },
  {
    field: "emergency_tire_repair_kit",
    label: "Emergency tire repair kit",
    id: 89,
  },
  {
    field: "active_noise_cancellation",
    label: "Active noise cancellation",
    id: 90,
  },
  {
    field: "cabin_air_filtration",
    label: "Cabin air filtration",
    id: 91,
  },
  {
    field: "driver_assistance_package",
    label: "Driver assistance package",
    id: 92,
  },
  {
    field: "roadside_assistance_kit",
    label: "Roadside assistance kit",
    id: 93,
  },
  {
    field: "child_safety_locks",
    label: "Child safety locks",
    id: 94,
  },
  {
    field: "child_seat_anchors_latch",
    label: "Child seat anchors latch",
    id: 95,
  },
  {
    field: "rear_seat_entertainment_system",
    label: "Rear seat entertainment system",
    id: 96,
  },
  {
    field: "in_car_vacuum_cleaner",
    label: "In car vacuum cleaner",
    id: 97,
  },
  {
    field: "pet_friendly_features",
    label: "Pet friendly features",
    id: 98,
  },
  {
    field: "weatherproof_floor_mats",
    label: "Weatherproof floor mats",
    id: 99,
  },
  {
    field: "all_weather_floor_liners",
    label: "All weather floor liners",
    id: 100,
  },
  {
    field: "adaptive_headlights",
    label: "Adaptive headlights",
    id: 101,
  },
  {
    field: "cornering_lights",
    label: "Cornering lights",
    id: 102,
  },
  {
    field: "high_beam_assist",
    label: "High beam assist",
    id: 103,
  },
  {
    field: "adaptive_suspension",
    label: "Adaptive suspension",
    id: 104,
  },
  {
    field: "active_body_control",
    label: "Active body control",
    id: 105,
  },
  {
    field: "active_park_assist",
    label: "Active park assist",
    id: 106,
  },
  {
    field: "automatic_parking_system",
    label: "Automatic parking system",
    id: 107,
  },
  {
    field: "surround_view_camera_system",
    label: "Surround view camera system",
    id: 108,
  },
  {
    field: "bird_s_eye_view_camera",
    label: "Bird s eye view camera",
    id: 109,
  },
  {
    field: "360_degree_camera",
    label: "360 degree camera",
    id: 110,
  },
  {
    field: "collision_mitigation_system",
    label: "Collision mitigation system",
    id: 111,
  },
  {
    field: "lane_keeping_assist",
    label: "Lane keeping assist",
    id: 112,
  },
  {
    field: "lane_centering_assist",
    label: "Lane centering assist",
    id: 113,
  },
  {
    field: "driver_attention_monitoring",
    label: "Driver attention monitoring",
    id: 114,
  },
  {
    field: "traffic_sign_recognition",
    label: "Traffic sign recognition",
    id: 115,
  },
  {
    field: "rear_cross_traffic_alert",
    label: "Rear cross traffic alert",
    id: 116,
  },
  {
    field: "blind_spot_intervention",
    label: "Blind spot intervention",
    id: 117,
  },
  {
    field: "automatic_parallel_parking",
    label: "Automatic parallel parking",
    id: 118,
  },
  {
    field: "electronic_stability_program_esp",
    label: "Electronic stability program esp",
    id: 119,
  },
  {
    field: "roll_stability_control",
    label: "Roll stability control",
    id: 120,
  },
  {
    field: "hill_start_assist",
    label: "Hill start assist",
    id: 121,
  },
  {
    field: "hill_descent_control",
    label: "Hill descent control",
    id: 122,
  },
  {
    field: "terrain_management_system",
    label: "Terrain management system",
    id: 123,
  },
  {
    field: "off_road_driving_mode",
    label: "Off road driving mode",
    id: 124,
  },
  {
    field: "active_noise_control",
    label: "Active noise control",
    id: 125,
  },
  {
    field: "road_surface_information_system",
    label: "Road surface information system",
    id: 126,
  },
  {
    field: "lane_change_assist",
    label: "Lane change assist",
    id: 127,
  },
  {
    field: "rear_collision_warning",
    label: "Rear collision warning",
    id: 128,
  },
  {
    field: "traffic_jam_assist",
    label: "Traffic jam assist",
    id: 129,
  },
  {
    field: "rear_traffic_alert",
    label: "Rear traffic alert",
    id: 130,
  },
  {
    field: "intersection_collision_assist",
    label: "Intersection collision assist",
    id: 131,
  },
  {
    field: "emergency_brake_assist",
    label: "Emergency brake assist",
    id: 132,
  },
  {
    field: "trailer_sway_control",
    label: "Trailer sway control",
    id: 133,
  },
  {
    field: "roll_over_protection_system_rops",
    label: "Roll over protection system rops",
    id: 134,
  },
  {
    field: "trailer_stability_assist",
    label: "Trailer stability assist",
    id: 135,
  },
  {
    field: "emergency_stop_signal",
    label: "Emergency stop signal",
    id: 136,
  },
  {
    field: "post_collision_braking_system",
    label: "Post collision braking system",
    id: 137,
  },
  {
    field: "pre_collision_throttle_management",
    label: "Pre collision throttle management",
    id: 138,
  },
  {
    field: "electronic_brakeforce_distribution_ebd",
    label: "Electronic brakeforce distribution ebd",
    id: 139,
  },
  {
    field: "emergency_brakeforce_distribution_ebd",
    label: "Emergency brakeforce distribution ebd",
    id: 140,
  },
  {
    field: "brake_assist_system_bas",
    label: "Brake assist system bas",
    id: 141,
  },
  {
    field: "adaptive_brake_lights",
    label: "Adaptive brake lights",
    id: 142,
  },
  {
    field: "electronic_parking_brake_epb",
    label: "Electronic parking brake epb",
    id: 143,
  },
  {
    field: "anti_slip_regulation_asr",
    label: "Anti slip regulation asr",
    id: 144,
  },
  {
    field: "electronic_differential_lock_edl",
    label: "Electronic differential lock edl",
    id: 145,
  },
  {
    field: "downhill_speed_regulation_dsr",
    label: "Downhill speed regulation dsr",
    id: 146,
  },
  {
    field: "trailer_assist",
    label: "Trailer assist",
    id: 147,
  },
  {
    field: "adaptive_air_suspension",
    label: "Adaptive air suspension",
    id: 148,
  },
  {
    field: "variable_ride_height_suspension",
    label: "Variable ride height suspension",
    id: 149,
  },
  {
    field: "auto_leveling_suspension",
    label: "Auto leveling suspension",
    id: 150,
  },
  {
    field: "active_steering",
    label: "Active steering",
    id: 151,
  },
  {
    field: "active_cruise_control",
    label: "Active cruise control",
    id: 152,
  },
  {
    field: "active_lane_departure_prevention",
    label: "Active lane departure prevention",
    id: 153,
  },
  {
    field: "active_blind_spot_intervention",
    label: "Active blind spot intervention",
    id: 154,
  },
  {
    field: "rear_automatic_braking",
    label: "Rear automatic braking",
    id: 155,
  },
  {
    field: "forward_automatic_emergency_braking",
    label: "Forward automatic emergency braking",
    id: 156,
  },
  {
    field: "rear_cross_traffic_braking",
    label: "Rear cross traffic braking",
    id: 157,
  },
  {
    field: "traffic_jam_assistant",
    label: "Traffic jam assistant",
    id: 158,
  },
  {
    field: "emergency_steering_assist",
    label: "Emergency steering assist",
    id: 159,
  },
  {
    field: "adaptive_suspension_damping",
    label: "Adaptive suspension damping",
    id: 160,
  },
  {
    field: "adjustable_ride_height",
    label: "Adjustable ride height",
    id: 161,
  },
  {
    field: "selectable_drive_modes",
    label: "Selectable drive modes",
    id: 162,
  },
  {
    field: "launch_control",
    label: "Launch control",
    id: 163,
  },
  {
    field: "automatic_drift_mode",
    label: "Automatic drift mode",
    id: 164,
  },
  {
    field: "cornering_brake_control",
    label: "Cornering brake control",
    id: 165,
  },
  {
    field: "active_roll_stabilization",
    label: "Active roll stabilization",
    id: 166,
  },
  {
    field: "variable_ratio_steering",
    label: "Variable ratio steering",
    id: 167,
  },
  {
    field: "electric_power_steering",
    label: "Electric power steering",
    id: 168,
  },
  {
    field: "variable_valve_timing",
    label: "Variable valve timing",
    id: 169,
  },
  {
    field: "direct_injection",
    label: "Direct injection",
    id: 170,
  },
  {
    field: "turbocharger",
    label: "Turbocharger",
    id: 171,
  },
  {
    field: "supercharger",
    label: "Supercharger",
    id: 172,
  },
  {
    field: "cylinder_deactivation",
    label: "Cylinder deactivation",
    id: 173,
  },
  {
    field: "variable_cylinder_management",
    label: "Variable cylinder management",
    id: 174,
  },
  {
    field: "start_stop_system",
    label: "Start stop system",
    id: 175,
  },
  {
    field: "regenerative_braking_system",
    label: "Regenerative braking system",
    id: 176,
  },
  {
    field: "brake_energy_regeneration",
    label: "Brake energy regeneration",
    id: 177,
  },
  {
    field: "electric_parking_brake_with_auto_hold",
    label: "Electric parking brake with auto hold",
    id: 178,
  },
  {
    field: "torque_vectoring",
    label: "Torque vectoring",
    id: 179,
  },
  {
    field: "launch_control",
    label: "Launch control",
    id: 180,
  },
  {
    field: "performance_traction_management",
    label: "Performance traction management",
    id: 181,
  },
  {
    field: "adaptive_suspension_geometry",
    label: "Adaptive suspension geometry",
    id: 182,
  },
  {
    field: "semi_active_suspension",
    label: "Semi active suspension",
    id: 183,
  },
  {
    field: "adjustable_suspension_damping",
    label: "Adjustable suspension damping",
    id: 184,
  },
  {
    field: "active_aero_shutters",
    label: "Active aero shutters",
    id: 185,
  },
  {
    field: "aerodynamic_body_panels",
    label: "Aerodynamic body panels",
    id: 186,
  },
  {
    field: "rear_wing_spoiler",
    label: "Rear wing spoiler",
    id: 187,
  },
  {
    field: "front_lip_spoiler",
    label: "Front lip spoiler",
    id: 188,
  },
  {
    field: "side_skirts",
    label: "Side skirts",
    id: 189,
  },
  {
    field: "rear_diffuser",
    label: "Rear diffuser",
    id: 190,
  },
  {
    field: "adjustable_intake_manifold",
    label: "Adjustable intake manifold",
    id: 191,
  },
  {
    field: "active_noise_cancellation",
    label: "Active noise cancellation",
    id: 192,
  },
  {
    field: "electrochromic_rearview_mirror",
    label: "Electrochromic rearview mirror",
    id: 193,
  },
  {
    field: "electrochromic_side_mirrors",
    label: "Electrochromic side mirrors",
    id: 194,
  },
  {
    field: "electronic_stability_program_esp_with_trailer_sway_control",
    label: "Electronic stability program esp with trailer sway control",
    id: 195,
  },
  {
    field: "trailer_brake_controller",
    label: "Trailer brake controller",
    id: 196,
  },
  {
    field: "roll_stability_control_rsc",
    label: "Roll stability control rsc",
    id: 197,
  },
  {
    field: "traction_control_system_tcs",
    label: "Traction control system tcs",
    id: 198,
  },
  {
    field: "electronic_brake_distribution_ebd",
    label: "Electronic brake distribution ebd",
    id: 199,
  },
  {
    field: "brake_override_system",
    label: "Brake override system",
    id: 200,
  },
];

export const propertyPurpose = [
  { id: 1, name: "Sell" },
  { id: 2, name: "Rent" },
];

export const AreaUnit = [
  { id: 1, name: "Marla" },
  { id: 2, name: "SQ.FT" },
  { id: 3, name: "SQ.M" },
  { id: 4, name: "SQ.YD" },
  { id: 5, name: "Kanal" },
];

export const propertyCheckbox = [
  { name: "Dining Room", value: false, type: "checkbox", icon:"material-symbols-light:local-dining", key: "dining_room" },
  { name: "Drawing Room", value: false, type: "checkbox", icon: "iconoir:two-seater-sofa", key: "drawing_room" },
  { name: "Elevators", value: false, type: "checkbox", icon: "medical-icon:i-elevators", key: "elevators" },
  { name: "Furnished", value: false, type: "checkbox", icon: "solar:star-shine-line-duotone" , key: "furnished" },
  { name: "Electricity Backup", value: false, type: "checkbox", icon: "pepicons-pencil:electricity-circle", key: "electricity_backup" },
  { name: "Prayer Room", value: false, type: "checkbox", icon: "arcticons:prayer-times", key: "prayer_room" },
  { name: "Lounge or Sitting Room", value: false, type: "checkbox", icon: "mdi:sofa-outline", key: "lounge_or_sitting_room" },
  { name: "Boundary Wall", value: false, type: "checkbox", icon:"ph:wall-duotone", key: "boundary_wall" },
  { name: "Kids Play Area", value: false, type: "checkbox", icon: "maki:playground", key: "kids_play_area" },
  { name: "Barbeque Area", value: false, type: "checkbox", icon: "mdi:grill-outline" , key: "barbeque_area" },
  { name: "Swimming Pool", value: false, type: "checkbox", icon: "material-symbols-light:pool-sharp" , key: "swimming_pool" },
  { name: "Central Air Conditioning", value: false, type: "checkbox", icon: "mingcute:air-condition-line" , key: "central_air_conditioning" },
  { name: "Central Heating", value: false, type: "checkbox", icon: "cbi:wiser-heating-ctl-on" , key: "central_heating" },
  { name: "Sui Gas", value: 0, type: "checkbox", icon: "mdi:gas-circle" , key: "sui_gas" },
  { name: "Wifi & Cable Connection", value: 0, type: "checkbox", icon: "ic:baseline-wifi" , key: "wifi_&_cable_connection" },
  { name: "Parking Spaces", value: 0, type: "checkbox", icon: "tdesign:location-parking-place" , key: "parking_spaces" },
];

export const propertyInputText = [
  { name: "Other Main Features", value: null, type: "text", icon: null, key: "other_main_features" },
];

export const numberInputs = [
  { name: "Kitchen", value: 0, type: "number", icon: null, key: "kitchen" },
  { name: "Floorcount", value: 0, type: "number", icon: null, key: "floorcount" },
  { name: "Laundry Rooms", value: 0, type: "number", icon: null, key: "laundry_rooms" },
  { name: "Store Rooms", value: 0, type: "number", icon: null, key: "store_rooms" },
  { name: "Nearby Schools", value: 0, type: "number", icon: null, key: "nearby_schools" },
  { name: "Nearby Hospitals", value: 0, type: "number", icon: null, key: "nearby_hospitals" },
  { name: "Nearby Shopping Malls", value: 0, type: "number", icon: null, key: "nearby_shopping_malls" },
  { name: "Nearby Restaurants", value: 0, type: "number", icon: null, key: "nearby_restaurants" },
  {
    name: "Nearby Public Transport Service",
    value: 0,
    type: "number",
    icon: null,
    key: "nearby_public_transport_service",
  },
  { name: "Nearby Mosque", value: 0, type: "number", icon: null, key: "nearby_mosque" },
];
export const options = [
  { id: 1, name: "Good" },
  { id: 1, name: "Average" },
  { id: 1, name: "Low" },
];
const years = [
  1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988,
  1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
  2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
];
export const selectBoxes = [
  { name: "Built in year", value: 0, type: "selectbox", icon: null, key: "built_in_year", options:years },
  { name: "Sewerage System", value: 0, type: "selectbox", icon: null, key: "sewerage_system", options },
  { name: "Water Supply", value: 0, type: "selectbox", icon: null, key: "water_supply", options },
];



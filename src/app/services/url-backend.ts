import { environment } from "src/environments/environment";

export const getAgenda = environment.api + 'turnos_disponibles/';
export const slugifyProf = environment.api + 'start_prof_task/';
export const Getlugares = environment.api + 'lugares_list/';
export const Getestatus = environment.api + 'estatus_services/';
export const GetServices = environment.api + 'get_services/';
export const updateServices = environment.api + 'update_services/';
// Pacientes
export const Getpacientes = environment.api + 'pacientes/';
export const BusPacientes = environment.api + 'bus_pacientes/';
export const MasterPacCrear = environment.api + 'master_paciente_crear/';
export const pacientesUpdate = environment.api + 'pacientes_update/';
export const pacientesDelete = environment.api + 'pacientes_delete/';
export const pacientesMatcheos = environment.api + 'matcheos_pacientes/';
export const MatcheoPacUpdate = environment.api + 'master_paciente_update/';
export const removerPacFromMaster = environment.api + 'pac_delete_from_master/';
export const removeMasterPac = environment.api + 'pac_delete_master/';

// Permisos
const permisos = 'permisos/';
export const getPermisos = environment.api + permisos + 'list/';
// Direcciones
export const getDirecciones = environment.api + 'get_direcciones';
export const updateDireccion = environment.api + 'update_direcciones/';

// cuentas
const usuarios = 'usuarios/';
export const getCuentas = environment.api + usuarios + 'list/';
export const getCuenta = environment.api + usuarios + 'get/';
export const crearCuenta = environment.api + usuarios + 'crear_con_rol/';
export const updateCuenta = environment.api + usuarios + 'update/';
export const login = environment.api + 'obtener_token';
// Roles
const roles = 'roles/';
export const getRoles = environment.api + roles + 'list/';
export const getAllRoles = environment.api + roles + 'list_all/';
export const getRole = environment.api + roles;
export const createRole = environment.api + roles + 'crear';
export const EditWPermisos = environment.api + roles + 'editar_con_permisos/'
export const CreateWPermisos = environment.api + roles + 'crear_con_permisos/'

export const agregarPermiso = environment.api + roles + 'agregar_permiso/';

// Equipos
export const Getequipos = environment.api + 'equipos/';
export const busEquipos = environment.api + 'bus_equipos/';


export const MasterEquipCrear = environment.api + 'master_equipos_crear/';
export const equiposUpdate = environment.api + 'equipos_update/';
export const equiposDelete = environment.api + 'equipos_delete/';
export const equiposMatcheos = environment.api + 'matcheos_equipos/';
export const MasterEquipUpd = environment.api + 'master_equipo_update/';
export const equiposMatcheosExport = environment.api + 'exportar_equipos_matcheados/';
export const removerEquipFromMaster = environment.api + 'equip_delete_from_master/';
export const removeMasterEquip = environment.api + 'equip_delete_master/';
// Estudios
export const Getestudios = environment.api + 'estudios/';
export const busEstudios = environment.api + 'bus_estudios/';
export const MasterEstCrear = environment.api + 'master_estudios_crear/';
export const estudiosUpdate = environment.api + 'estudios_update/';
export const estudiosDelete = environment.api + 'estudios_delete/';
export const estudiosMatcheos = environment.api + 'matcheos_estudios/';
export const MasterEstUpd = environment.api + 'master_estudios_update/';
export const estudiosMatcheosExport = environment.api + 'exportar_estudios_matcheados/';
export const removerEstFromMaster = environment.api + 'est_delete_from_master/';
export const removeMasterEst = environment.api + 'est_delete_master/';
// Profesionales
export const Getprofesionales = environment.api + 'profesionales/';
export const BusProfesionales = environment.api + 'bus_profesionales/';
export const mergeoProfesionales = environment.api + 'matcheo_profesionales/';

export const busProfesionalesTesting = environment.api + 'get_profesionales_testing/';
export const latestProfs = environment.api + 'latest_profesionales/';
export const MasterProfCrear = environment.api + 'master_profesional_crear/';
export const profesionalesUpdate = environment.api + 'profesionales_update/';
export const profesionalesDelete = environment.api + 'profesionales_delete/';
export const profesionalesMatcheos = environment.api + 'matcheos_profesionales/';
export const MatcheoProfUpdate = environment.api + 'master_profesional_update/';
export const removerProfFromMaster = environment.api + 'prof_delete_from_master/';
export const removeMasterProf = environment.api + 'prof_delete_master/';

export const profesionalesMatcheosExport = environment.api + 'exportar_profesionales_matcheados/';
// Especialidades
export const Getespecialidades = environment.api + 'especialidades/';
export const BusEspecialidades = environment.api + 'bus_especialidades/';
export const MasterEspCrear = environment.api + 'master_especialidades_crear/';
export const especialidadesUpdate = environment.api + 'especialidades_update/';
export const especialidadesDelete = environment.api + 'especialidades_delete/';
export const especialidadesMatcheos = environment.api + 'matcheos_especialidades/';
export const especialidadesMatcheosExport = environment.api + 'exportar_especialidades_matcheados/';
export const MatcheoEspUpdate = environment.api + 'master_especialidad_update/';
export const removerEspFromMaster = environment.api + 'esp_delete_from_master/';
export const removeMasterEsp = environment.api + 'esp_delete_master/';
export const latestEsps = environment.api + 'latest_especialidades/';
// Obras Sociales
export const Getos = environment.api + 'os/';
export const Busos = environment.api + 'bus_os/';
export const MasterOsCrear = environment.api + 'master_os_crear/';
export const osUpdate = environment.api + 'os_update/';
export const osDelete = environment.api + 'os_delete/';
export const osMatcheos = environment.api + 'matcheos_os/';
export const osMatcheosExport = environment.api + 'exportar_os_matcheados/';
export const MatcheoOsUpdate = environment.api + 'master_os_update/';
export const busOsTesting = environment.api + 'get_obras_sociales/';

export const removerOsFromMaster = environment.api + 'os_delete_from_master/';
export const removeMasterOs = environment.api + 'os_delete_master/';
export const habilitacionOs = environment.api + 'os_habilitacion/';
export const habilitacionMaster = environment.api + 'os_habilitacion_master/';


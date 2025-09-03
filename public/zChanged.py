from collections import OrderedDict
import json
# •
diret = r"C:\iDev\Projetos\RSCorretora\RS-React-Vers\RSCorretora\public\construtoras.json"
# diret = r"C:\iDev\Projetos\RSCorretora\RS-React-Vers\RSCorretora\public\constSave.json"

# diret = r"C:\iDev\Projetos\RSCorretora\RS-React-Vers\RSCorretora\public\teste.json"

with open(diret, "r", encoding="utf-8") as file:
    data = json.load(file)

def idInUrl(the_url):
    return the_url.split("/residenciais/")[1].split("/")[0].lower()

array_urls = [
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591608/rscorretora/residenciais/julio-schappo/logo/XgeHlVJwIx_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591499/rscorretora/residenciais/majestic/logo/obBFplfnXI_lGTdsNOaTX_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591671/rscorretora/residenciais/vancouver/logo/mvwRDJVUAn_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1756920238/rscorretora/residenciais/Premiatto/logo/k1j4emc1wtvqh10yz4ib.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1756920225/rscorretora/residenciais/Agapito/logo/ftb74iqoqedeqbr3rllu.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591507/rscorretora/residenciais/privilege/logo/zzrjmPehjy_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591699/rscorretora/residenciais/solo-blvd/logo/gwYhzXVhQc_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591539/rscorretora/residenciais/don/logo/sdnTcODZrG_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591691/rscorretora/residenciais/ville-de-luxembourg/logo/UnRLSCgksy_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591651/rscorretora/residenciais/riviere-petrusse/logo/TjJOMERddw_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591481/rscorretora/residenciais/belle-ville/logo/YMNbAjFjJf_CcYtDQkOWD_HMBqGxUDhI_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591530/rscorretora/residenciais/valentina/logo/hqyswlEStX_RqMmHDikFQ_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591584/rscorretora/residenciais/colina-de-sao-pedro/logo/RIoYMIGWXp_VxkbeHoNoX_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591680/rscorretora/residenciais/villa-vauban/logo/rTsmRjzmiv_laVOEKBNUG_pdbZUQqEEN_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591546/rscorretora/residenciais/reserva/logo/itWFdbUhXX_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591559/rscorretora/residenciais/my-hub/logo/ElbrgcGYim_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591566/rscorretora/residenciais/vivarte/logo/nhNgWAMXSq_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591573/rscorretora/residenciais/boulevard-atlantique/logo/fuVycVMVZU_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591492/rscorretora/residenciais/lidia-dircksen/logo/lhUBwocVHZ_gfHtOGCwsk_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591554/rscorretora/residenciais/voga/logo/vzTeOLtcnM_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591613/rscorretora/residenciais/lyon/logo/UwhBvsMrgc_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591600/rscorretora/residenciais/boulevard-royal/logo/MErTwXWGXi_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591519/rscorretora/residenciais/santos-dumont/logo/AZXLOaRspx_ujcOrbVzGB_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591594/rscorretora/residenciais/sophia/logo/SGcMOkHorh_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591664/rscorretora/residenciais/tremont/logo/MRhJsAjXOK_logo.png",
    "https://res.cloudinary.com/marcos-grando/image/upload/v1744591656/rscorretora/residenciais/saint-michel/logo/FRHpGLWBkn_logo.png"
]


for a, const in enumerate(data):
    print("---- ", const['const-nome'], " ----")

    for b, resid in enumerate(const['empreendimentos']):
        alvo = resid['id-nome']
        result = next((url for url in array_urls if alvo.lower() in url.lower()), None)
        if result:
            resid['infos-main']['logo'] = result
            print('true')
        else: print('false')
        



with open(diret, "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4, ensure_ascii=False)

# print("Dados apresentados com sucesso!")



# def substituir_caminhos(obj):
#     if isinstance(obj, dict):
#         for chave, valor in obj.items():
#             if isinstance(valor, str) and (valor.startswith("imgs/") or valor.startswith("/imgs/")):
#                 obj[chave] = cloudinary_base + valor.lstrip("/")
#             else:
#                 substituir_caminhos(valor)
#     elif isinstance(obj, list):
#         for item in obj:
#             substituir_caminhos(item)

# substituir_caminhos(data)


# for a, const in enumerate(data):
#     for b, resid in enumerate(const['empreendimentos']):
#         if resid['id-nome'] == 'premiatto-&-agapito':
#             # print(resid['premiatto'].keys())
#             # print(resid['agapito'].keys())
#             print(resid['premiatto']['infos-apto']['imagens-apto'])


# for a, const in enumerate(data):
#     for b, resid in enumerate(const['empreendimentos']):
#         if resid['id-nome'] != "premiatto-&-agapito":
#             resid["infos-plantas"]["detalhes-plantas"] = [item.lstrip('•').lstrip() for item in resid["infos-plantas"]["detalhes-plantas"]]
#         else:
#             resid["premiatto"]["infos-plantas"]["detalhes-plantas"] = [item.lstrip('•').lstrip() for item in resid["premiatto"]["infos-plantas"]["detalhes-plantas"]]
#             resid["agapito"]["infos-plantas"]["detalhes-plantas"]   = [item.lstrip('•').lstrip() for item in resid["agapito"]["infos-plantas"]["detalhes-plantas"]]


# Foi feito um aninhado de iterações, para atualizar o link de cada "img" com '/' no início;
# for i, const in enumerate(data):
#     for ii, resid in enumerate(const['empreendimentos']):
#         if 'infos-cond' in resid:
#             lista_residenciais = [resid]
#         else:
#             lista_residenciais = [resid[key] for key in resid if key not in ['id-nome', 'infos-main']]

#         for residencial in lista_residenciais:
#             for iii, infosCond in enumerate(residencial['infos-cond']['imagens-cond']):
#                 for iiii, img in enumerate(infosCond['imgs']):
#                     img['img'] = "/" + img['img']


# ic => indice construtora / ir => indice residencial
# for ic, const in enumerate(data):
#     for ir, resid in enumerate(const['empreendimentos']):
#         print(resid['infos-main']['title'])

# resid['infos-main']["subtitle"] = "Residencial"
# resid['infos-main']["title"]    = detalhesLista[ic][ir][0]
# resid['infos-main']["local"]    = detalhesLista[ic][ir][1]
# resid['infos-main']["status"]   = detalhesLista[ic][ir][2]
# resid['infos-main']['valor']    = detalhesLista[ic][ir][3]


# ~~~ ALTERANDO INFOS_MAIN ~~~
# constResid = [0, 0]
# dirett = 'imgs/construtoras/am/belle-ville/'

# infosUpdate = data[constResid[0]]['empreendimentos'][constResid[1]]['infos-main']

# infosUpdate["subtitle"]  = 'Residencial'
# infosUpdate["title"]     = 'Belle Ville'
# infosUpdate["local"]     = 'Campinas, São José'
# infosUpdate["status"]    = 'Entrega em nov/2027'
# infosUpdate['valor']     = 'A partir de R$ 675.000,00'
# infosUpdate['detalhes']  = ["Total de 127 Unidades", "9 Opções de Plantas", "22.036,32 m²"]

# data[0]['empreendimentos'][0]['infos-main']["logo"]
# data[0]['empreendimentos'][0]['infos-main']["banner"]
# data[0]['empreendimentos'][0]['infos-main']["thumb"]
# data[0]['empreendimentos'][0]['infos-main']["fachada"]
# data[0]['empreendimentos'][0]['infos-main']["subtitle"]
# data[0]['empreendimentos'][0]['infos-main']["title"]
# data[0]['empreendimentos'][0]['infos-main']["local"]
# data[0]['empreendimentos'][0]['infos-main']["status"]
# data[0]['empreendimentos'][0]['infos-main']['valor']
# data[0]['empreendimentos'][0]['infos-main']['detalhes']


# # ~~~ Atualização de informações, 2 etapas: ~~~

# # 1 ~ Diretórios de cada pastas de Residencial ~
# listaDiret = [
#     ['imgs/construtoras/am/belle-ville/',
#     'imgs/construtoras/am/lidia-dircksen/',
#     'imgs/construtoras/am/majestic/',
#     'imgs/construtoras/am/privilege/',
#     'imgs/construtoras/am/santos-dumont/',
#     'imgs/construtoras/am/valentina/'
#     ],

#     ['imgs/construtoras/amc/don/',
#     'imgs/construtoras/amc/reserva/',
#     'imgs/construtoras/amc/voga/'],

#     ['imgs/construtoras/ferreira-antunes/my-hub/',
#     'imgs/construtoras/ferreira-antunes/vivarte/'],

#     ['imgs/construtoras/gentil/boulevard-atlantique/'],

#     ['imgs/construtoras/lg/colina-de-sao-pedro/',
#     'imgs/construtoras/lg/sophia/'],

#     ['imgs/construtoras/rdo/boulevard-royal/',
#     'imgs/construtoras/rdo/julio-schappo/',
#     'imgs/construtoras/rdo/lyon/',
#     'imgs/construtoras/rdo/premiatto-&-agapito/',
#     'imgs/construtoras/rdo/riviere-petrusse/',
#     'imgs/construtoras/rdo/saint-michel/',
#     'imgs/construtoras/rdo/tremont/',
#     'imgs/construtoras/rdo/vancouver/',
#     'imgs/construtoras/rdo/villa-vauban/',
#     'imgs/construtoras/rdo/ville-de-luxembourg/'],

#     ['imgs/construtoras/zilli/solo-blvd/']
# ]

# # 2 ~ ORDENANDO EM ORDEM ~
# for a, const in enumerate(data):
#     for b, resid in enumerate(const['empreendimentos']):
#         novos_itens = OrderedDict([
#             ("logo", listaDiret[a][b] + "logo.png"),
#             ("banner", listaDiret[a][b] + "banner.jpg"),
#             ("thumb", listaDiret[a][b] + "thumb.jpg"),
#             ("fachada", listaDiret[a][b] + "fachada.jpg"),
#         ])
#         infos_main = OrderedDict([
#             ("subtitle", resid['infos-main']["subtitle"]),
#             ("title", resid['infos-main']["title"]),
#             ("local", resid['infos-main']["local"]),
#             ("status", resid['infos-main']["status"]),
#             ("valor", resid['infos-main']["valor"]),
#             ("detalhes", resid['infos-main']["detalhes"]),
#         ])
#         new_infos_main = OrderedDict({**novos_itens, **infos_main})
#         resid['infos-main'] = new_infos_main


# ~~~ Detalhes APTO com todas as características ~~~
# Comentar para filtrar informação

# detalhesResid['infos-apto']['detalhes-apto'] = [
#     "Aptos de 2 a 3 Dormitórios",
#     "Coberturas com 4 Suítes",
#     "Apartamentos 3 Suítes + Lavabo",
#     "Quartos com Persiana Elétrica",
#     "Tubulação para Água Quente",
#     "Sacada com Churrasqueira",
#     "Isolamento Ácustico",
#     "Acabamento em Gesso",
#     "Infra para Ar Split",
#     "Piso Porcelanato",
#     "Piso Vinílico",
#     "Piso Laminado",
#     "Lavabo",
# ]

# detalhesResid['infos-cond']['detalhes-cond'] = [
#     "Total de 98 Unidades",
#     "Total de 128 Garagens",
#     "Zeladoria e Sala de Condomínio",
#     "Infra para Carro Elétrico",
#     "Espaço Gourmet com Jogos",
#     "Quiosque com Churrasqueira",
#     "Quadra Esportiva",
#     "Piscina Térmica",
#     "Piscina Coberta",
#     "Hidromassagem",
#     "2 Salões de Festas",
#     "Salão de Festas",
#     "Salão de Festa kids",
#     "Espaço Gourmet",
#     "Espaço Fitness",
#     "Espaço Business",
#     "Lounge Lareira",
#     "Lounge Piscina",
#     "Lounge Social",
#     "Lounge Bar",
#     "Portaria 24h",
#     "Sala de Jogos",
#     "Bicicletário",
#     "Brinquedoteca",
#     "Playground",
#     "Home Cinema",
#     "Home Market",
#     "2 Elevadores",
#     "Lavanderia",
#     "Pet Place",
#     "Piscina",
#     "Jardins",
#     "Horta",
#     "SPA",
# ]


# ~~~ Atualizando latitude e longitude de infos-main ~~~

# ~ 1 - Lista com cada info ~
# detalhesLista = [
#     # am
#     [
#         { "lati": -27.596168672163085, "long": -48.60687793857005   },    # Belle Ville
#         { "lati": -27.599955613900935, "long": -48.60969640701475   },    # Lídia Dircksen
#         { "lati": -27.593978,          "long": -48.612952           },    # Majestic
#         { "lati": -27.5947723,         "long": -48.6110954          },    # Privilége
#         { "lati": -27.579407756221798, "long": -48.611917726265496  },    # Santos Dumont
#         { "lati": -27.5976722,         "long": -48.6082651          }     # Valentina
#     ],

#     # amc
#     [
#         { "lati": -27.593804341024533, "long": -48.609801538626535 },    # Don ,
#         { "lati": -27.598483825161246, "long": -48.61030903277367  },    # Reserva ,
#         { "lati": -27.590404692358785, "long": -48.61302516012245  }     # Voga ,
#     ],

#     # fa
#     [
#         { "lati": -27.608779440132558, "long": -48.57723920191385 },    # My Hub ,
#         { "lati": -27.59838593106209,  "long": -48.61585565218229 }     # Vivarte ,
#     ],

#     # gentil
#     [
#         { "lati": -27.580036105977,    "long": -48.60283397492998 }     # Boulevard Atlantique ,
#     ],

#     # lg
#     [
#         { "lati": -27.575475625022758, "long": -48.60447345588487 },    # Colina de São Pedro  ,
#         { "lati": -27.57745208097386,  "long": -48.61794456849335 }     # Sophia ,
#     ],

#     # rdo
#     [
#         { "lati": -27.09147254652732,  "long": -48.61160701542615  },    # Boulevard Royal ,
#         { "lati": -27.586653567385333, "long": -48.58409389080939  },    # Julio Schappo ,
#         { "lati": -27.593353257191726, "long": -48.614926834988324 },    # Lyon ,
#         { "lati": -27.585176264439838, "long": -48.58794810006385  },    # Premiatto & Agapito ,
#         { "lati": -27.59613848380371,  "long": -48.614696961909715 },    # Rivière Pétrusse ,
#         { "lati": -27.592950226195008, "long": -48.61477688465664  },    # Saint Michel ,
#         { "lati": -27.575958104924553, "long": -48.61512428486454  },    # Trémont  ,
#         { "lati": -27.595749555143694, "long": -48.614793626984955 },    # Vancouver ,
#         { "lati": -27.587069332212895, "long": -48.57929610061968  },    # Villa Vauban ,
#         { "lati": -27.59110923961243,  "long": -48.61405947370832  }     # Ville de Luxembourg ,
#     ],

#     # zilli
#     [
#         { "lati": -27.600120514358096,  "long": -48.61843429074556 }     # Solo BLVD ,
#     ]

# ]

# ~ 2 - iteração inserindo as infos ~
# for a, const in enumerate(data):
#     for b, resid in enumerate(const['empreendimentos']):
#         resid['infos-main'].update(detalhesLista[a][b])



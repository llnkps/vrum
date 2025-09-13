# import json
# import os
# import time
# import requests

# # Your JSON data
# data = [
#     {
#         "name": "Abarth",
#         "src": ["https://c.rdrom.ru/js/bundles/media/abarth.7429bd58ee80921494fb.png"],
#     },
#     {
#         "name": "AC",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/ac-light.1d02f52da2c1274fc706.png",
#             "https://c.rdrom.ru/js/bundles/media/ac-dark.128be8a37abd53383cae.png",
#         ],
#     },
#     {
#         "name": "Acura",
#         "src": ["https://c.rdrom.ru/js/bundles/media/acura.d3ac4a7ccad16ed7a225.png"],
#     },
#     {
#         "name": "AITO",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/aito-light.52815da0bf3e0c0a2f4a.png",
#             "https://c.rdrom.ru/js/bundles/media/aito-dark.5b1d6c39ed52a39f4b3c.png",
#         ],
#     },
#     {
#         "name": "Alfa Romeo",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/alfa-romeo.1e99c67bfd858f986fba.png"
#         ],
#     },
#     {
#         "name": "Alpina",
#         "src": ["https://c.rdrom.ru/js/bundles/media/alpina.561d1eea566f16232f54.png"],
#     },
#     {
#         "name": "Alpine",
#         "src": ["https://c.rdrom.ru/js/bundles/media/alpine.2d1a428730d77af6ad0e.png"],
#     },
#     {"name": "AMC", "src": ["https://i.rdrom.ru/404/empty.gif"]},
#     {
#         "name": "Aro",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/aro-light.0252f506fd4ab052e30b.png",
#             "https://c.rdrom.ru/js/bundles/media/aro-dark.6aa7c171d1469956fbab.png",
#         ],
#     },
#     {
#         "name": "Asia",
#         "src": ["https://c.rdrom.ru/js/bundles/media/asia.830e4d038a4522216862.png"],
#     },
#     {
#         "name": "Aston Martin",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/astonmartin-light.57c247de83ca6954903c.png",
#             "https://c.rdrom.ru/js/bundles/media/astonmartin-dark.80fe21686cf6ce8c8d31.png",
#         ],
#     },
#     {
#         "name": "Audi",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/audi-light.766b5d397af6a9784156.png",
#             "https://c.rdrom.ru/js/bundles/media/audi-dark.412a6c475d41128aaac0.png",
#         ],
#     },
#     {
#         "name": "Avatr",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/avatr-light.f20b9484318576b318fb.png",
#             "https://c.rdrom.ru/js/bundles/media/avatr-dark.d02cea9a04aaea45cc09.png",
#         ],
#     },
#     {
#         "name": "BAIC",
#         "src": ["https://c.rdrom.ru/js/bundles/media/baic.174ec57728ddc494a724.png"],
#     },
#     {
#         "name": "Baojun",
#         "src": ["https://c.rdrom.ru/js/bundles/media/baojun.b74bac7bd5bf56e3a230.png"],
#     },
#     {
#         "name": "BAW",
#         "src": ["https://c.rdrom.ru/js/bundles/media/baw.32d7399b3f84446ceaaf.png"],
#     },
#     {
#         "name": "Belgee",
#         "src": ["https://c.rdrom.ru/js/bundles/media/belgee.0a260320007632d434ff.png"],
#     },
#     {
#         "name": "Bentley",
#         "src": ["https://c.rdrom.ru/js/bundles/media/bentley.704286eb468a58d7ad6d.png"],
#     },
#     {"name": "Bestune", "src": ["https://i.rdrom.ru/404/empty.gif"]},
#     {
#         "name": "BMW",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/bmw-light.63c8532776357e9102c6.png",
#             "https://c.rdrom.ru/js/bundles/media/bmw-dark.6e7e6fa021ed9c70c42c.png",
#         ],
#     },
#     {
#         "name": "Borgward",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/borgward.a4b858535a106f54a293.png"
#         ],
#     },
#     {
#         "name": "Brilliance",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/brilliance.70a38ed01fd4f4e1e0dc.png"
#         ],
#     },
#     {
#         "name": "Bugatti",
#         "src": ["https://c.rdrom.ru/js/bundles/media/bugatti.a210cd8c7de53235bc83.png"],
#     },
#     {
#         "name": "Buick",
#         "src": ["https://c.rdrom.ru/js/bundles/media/buick.ca0914d97d396d642516.png"],
#     },
#     {
#         "name": "BYD",
#         "src": ["https://c.rdrom.ru/js/bundles/media/byd.89e07334e36d65c29d67.png"],
#     },
#     {
#         "name": "Cadillac",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/cadillac.bbb37d569e944934c45a.png"
#         ],
#     },
#     {
#         "name": "Changan",
#         "src": ["https://c.rdrom.ru/js/bundles/media/changan.abaf17deda8b92f839e9.png"],
#     },
#     {
#         "name": "Changfeng",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/changfeng.2b945b6e3e4a1a2ddc12.png"
#         ],
#     },
#     {
#         "name": "Changhe",
#         "src": ["https://c.rdrom.ru/js/bundles/media/changhe.083630a057395c063c6c.png"],
#     },
#     {
#         "name": "Chery",
#         "src": ["https://c.rdrom.ru/js/bundles/media/chery.41871b3805a2dbf160d5.png"],
#     },
#     {
#         "name": "Chevrolet",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/chevrolet.1833f79352ce503b08c9.png"
#         ],
#     },
#     {
#         "name": "Chrysler",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/chrysler.f44ea6644db8e176ddf9.png"
#         ],
#     },
#     {
#         "name": "Citroen",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/citroen-light.de79eff21bbc40a7b08f.png",
#             "https://c.rdrom.ru/js/bundles/media/citroen-dark.8af2ce212e61c8ea0615.png",
#         ],
#     },
#     {
#         "name": "Cupra",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/cupra-light.ad5065ebb5787b4d94e5.png",
#             "https://c.rdrom.ru/js/bundles/media/cupra-dark.1d5beaa9f8053bd734b3.png",
#         ],
#     },
#     {
#         "name": "Dacia",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/dacia-light.9a8d9bf5d1bc45b942e1.png",
#             "https://c.rdrom.ru/js/bundles/media/dacia-dark.efffb7eac5864f43a602.png",
#         ],
#     },
#     {
#         "name": "Dadi",
#         "src": ["https://c.rdrom.ru/js/bundles/media/dadi.b7fff19f394e9ff94cda.png"],
#     },
#     {
#         "name": "Daewoo",
#         "src": ["https://c.rdrom.ru/js/bundles/media/daewoo.590f87a8ecef73f94e62.png"],
#     },
#     {
#         "name": "Daihatsu",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/daihatsu.0e8719e49df2d2d07a1d.png"
#         ],
#     },
#     {
#         "name": "Datsun",
#         "src": ["https://c.rdrom.ru/js/bundles/media/datsun.d76215d8d955cf3dfbc4.png"],
#     },
#     {
#         "name": "Dayun",
#         "src": ["https://c.rdrom.ru/js/bundles/media/dayun.e42c06fce71058fa7c2f.png"],
#     },
#     {
#         "name": "Denza",
#         "src": ["https://c.rdrom.ru/js/bundles/media/denza.badef76c051d1a6d1559.png"],
#     },
#     {
#         "name": "Derways",
#         "src": ["https://c.rdrom.ru/js/bundles/media/derways.f8f50e0f56e03cd9b47b.png"],
#     },
#     {
#         "name": "Dodge",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/dodge-light.3334dc84ae58494f8c55.png",
#             "https://c.rdrom.ru/js/bundles/media/dodge-dark.4c24bf62ea82e7a13588.png",
#         ],
#     },
#     {
#         "name": "Dongfeng",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/dongfeng.ecc2988b1e15e97b4281.png"
#         ],
#     },
#     {
#         "name": "DW Hower",
#         "src": "https://c.rdrom.ru/js/bundles/media/dw-hower.fd099650186e285709cb.png",
#     },
#     {
#         "name": "Eagle",
#         "src": "https://c.rdrom.ru/js/bundles/media/eagle.033bf3da0d8a9b80b29c.png",
#     },
#     {
#         "name": "EXEED",
#         "src": "https://c.rdrom.ru/js/bundles/media/exeed.ed2f74d051508155670f.png",
#     },
#     {
#         "name": "FAW",
#         "src": "https://c.rdrom.ru/js/bundles/media/faw.01ed4c6a199bef7dc440.png",
#     },
#     {
#         "name": "Ferrari",
#         "src": "https://c.rdrom.ru/js/bundles/media/ferrari.28b8c3d886bf65723f59.png",
#     },
#     {
#         "name": "Fiat",
#         "src": "https://c.rdrom.ru/js/bundles/media/fiat.2060f0b7c931db934113.png",
#     },
#     {
#         "name": "Ford",
#         "src": "https://c.rdrom.ru/js/bundles/media/ford.5258a60d3e04d9c73d14.png",
#     },
#     {
#         "name": "Forthing",
#         "src": "https://c.rdrom.ru/js/bundles/media/forthing.5ca71c3b20bc3addc149.png",
#     },
#     {
#         "name": "Foton",
#         "src": "https://c.rdrom.ru/js/bundles/media/foton.41870011918ea443543f.png",
#     },
#     {"name": "FSO", "src": "https://i.rdrom.ru/404/empty.gif"},
#     {
#         "name": "GAC",
#         "src": "https://c.rdrom.ru/js/bundles/media/gac.ac3938fc3cc2c63ad0cd.png",
#     },
#     {
#         "name": "Geely",
#         "src": "https://c.rdrom.ru/js/bundles/media/geely-light.7210d09d28fa8a4d4383.png",
#     },
#     {
#         "name": "Genesis",
#         "src": "https://c.rdrom.ru/js/bundles/media/genesis.e0980297c899f2837984.png",
#     },
#     {
#         "name": "Geo",
#         "src": "https://c.rdrom.ru/js/bundles/media/geo.c23c86d2b5051d0df5b4.png",
#     },
#     {
#         "name": "GMC",
#         "src": "https://c.rdrom.ru/js/bundles/media/gmc.45ca4c41396bc782ef6a.png",
#     },
#     {
#         "name": "Great Wall",
#         "src": "https://c.rdrom.ru/js/bundles/media/great-wall.74fcdba1af4834309f37.png",
#     },
#     {
#         "name": "Hafei",
#         "src": "https://c.rdrom.ru/js/bundles/media/hafei.d02e9989e6abe170ab3e.png",
#     },
#     {
#         "name": "Haima",
#         "src": "https://c.rdrom.ru/js/bundles/media/haima.ad0aaaab2ad0c7c421e6.png",
#     },
#     {
#         "name": "Haval",
#         "src": "https://c.rdrom.ru/js/bundles/media/haval-light.a9694b958caf1a856960.png",
#     },
#     {
#         "name": "Hawtai",
#         "src": "https://c.rdrom.ru/js/bundles/media/hawtai.d576b5dd8b1ea50b948d.png",
#     },
#     {
#         "name": "HiPhi",
#         "src": "https://c.rdrom.ru/js/bundles/media/hiphi-light.daca174a08f38f185256.png",
#     },
#     {
#         "name": "Honda",
#         "src": "https://c.rdrom.ru/js/bundles/media/honda.90a9c276ea492b5a7dc8.png",
#     },
#     {
#         "name": "Hongqi",
#         "src": "https://c.rdrom.ru/js/bundles/media/hongqi.cf20689ad2f0ceaa4101.png",
#     },
#     {
#         "name": "Hozon",
#         "src": "https://c.rdrom.ru/js/bundles/media/hozon-light.31f50419b7e6ea6f3839.png",
#     },
#     {
#         "name": "Huanghai",
#         "src": "https://c.rdrom.ru/js/bundles/media/huanghai.3b3da7b13696942b5a23.png",
#     },
#     {
#         "name": "Hummer",
#         "src": "https://c.rdrom.ru/js/bundles/media/hummer-light.43f8937d20e45e274b20.png",
#     },
#     {
#         "name": "Hyundai",
#         "src": "https://c.rdrom.ru/js/bundles/media/hyundai-light.59fefbb0a7afd5336324.png",
#     },
#     {
#         "name": "iCAR",
#         "src": "https://c.rdrom.ru/js/bundles/media/i-car-light.5acd70209347912d0988.png",
#     },
#     {
#         "name": "IM Motors",
#         "src": "https://c.rdrom.ru/js/bundles/media/im-motors-light.d5ecb7cca2a8f167216c.png",
#     },
#     {"name": "Ineos", "src": "https://i.rdrom.ru/404/empty.gif"},
#     {
#         "name": "Infiniti",
#         "src": "https://c.rdrom.ru/js/bundles/media/infiniti.a44b9412fdb2f075783b.png",
#     },
#     {
#         "name": "Iran Khodro",
#         "src": "https://c.rdrom.ru/js/bundles/media/iran-khodro.43872a9ce1dbc2feeb7e.png",
#     },
#     {
#         "name": "Isuzu",
#         "src": "https://c.rdrom.ru/js/bundles/media/isuzu.cf0892e73d53a554ba64.png",
#     },
#     {
#         "name": "IVECO",
#         "src": "https://c.rdrom.ru/js/bundles/media/iveco.96f3a76c2bc6052462fa.png",
#     },
#     {
#         "name": "JAC",
#         "src": "https://c.rdrom.ru/js/bundles/media/jac.0496d3a4020dc0156a5e.png",
#     },
#     {
#         "name": "Jaecoo",
#         "src": "https://c.rdrom.ru/js/bundles/media/jaecoo-light.fc40804a43624c6171fd.png",
#     },
#     {
#         "name": "Jaguar",
#         "src": "https://c.rdrom.ru/js/bundles/media/jaguar.2a704c844655ac4de7ed.png",
#     },
#     {
#         "name": "Jeep",
#         "src": "https://c.rdrom.ru/js/bundles/media/jeep.6ab14a41621a6db3176e.png",
#     },
#     {
#         "name": "Jetour",
#         "src": "https://c.rdrom.ru/js/bundles/media/jetour-light.1fc542e299ece0cb1b1c.png",
#     },
#     {
#         "name": "Jetta",
#         "src": "https://c.rdrom.ru/js/bundles/media/jetta-light.795102d682a0c0d00d85.png",
#     },
#     {
#         "name": "Jidu",
#         "src": "https://c.rdrom.ru/js/bundles/media/jidu-light.728f7f2d3db3355316c4.png",
#     },
#     {
#         "name": "Jinbei",
#         "src": "https://c.rdrom.ru/js/bundles/media/jinbei.43cf9885bfca63489eb8.png",
#     },
#     {
#         "name": "JMC",
#         "src": "https://c.rdrom.ru/js/bundles/media/jmc.236760390a2d7c87534a.png",
#     },
#     {
#         "name": "Kaiyi",
#         "src": "https://c.rdrom.ru/js/bundles/media/kaiyi-light.f20fab86f2ce02877d4f.png",
#     },
#     {
#         "name": "KG Mobility",
#         "src": "https://c.rdrom.ru/js/bundles/media/kgm-light.7fe96642d3b7b34f023a.png",
#     },
#     {
#         "name": "Kia",
#         "src": "https://c.rdrom.ru/js/bundles/media/kia-light.d11a15a00d5e360c840e.png",
#     },
#     {
#         "name": "Knewstar",
#         "src": "https://c.rdrom.ru/js/bundles/media/knewstar-light.fab839646ff750ee2256.png",
#     },
#     {
#         "name": "Kuayue",
#         "src": "https://c.rdrom.ru/js/bundles/media/kuayue.3cf3c248f6027fad0dce.png",
#     },
#     {
#         "name": "Lamborghini",
#         "src": "https://c.rdrom.ru/js/bundles/media/lamborghini.74b1e6f84818a0bdce7a.png",
#     },
#     {
#         "name": "Lancia",
#         "src": "https://c.rdrom.ru/js/bundles/media/lancia.89f35541217e1fc07c14.png",
#     },
#     {
#         "name": "Land Rover",
#         "src": "https://c.rdrom.ru/js/bundles/media/land-rover.0808fbea3421388836aa.png",
#     },
#     {
#         "name": "Landwind",
#         "src": "https://c.rdrom.ru/js/bundles/media/landwind-light.7811c2acd4b3fb9430ec.png",
#     },
#     {
#         "name": "Leapmotor",
#         "src": "https://c.rdrom.ru/js/bundles/media/leapmotor-light.a85f0975621c3cb525bd.png",
#     },
#     {
#         "name": "Lexus",
#         "src": "https://c.rdrom.ru/js/bundles/media/lexus.b635e5e8050f687d5c2f.png",
#     },
#     {
#         "name": "Li",
#         "src": "https://c.rdrom.ru/js/bundles/media/li-light.d159dff9e1b4422d9042.png",
#     },
#     {
#         "name": "Lifan",
#         "src": "https://c.rdrom.ru/js/bundles/media/lifan-light.b12096988144f5d8f53a.png",
#     },
#     {
#         "name": "Lincoln",
#         "src": "https://c.rdrom.ru/js/bundles/media/lincoln-light.d0d9b87d9884340da5fa.png",
#     },
#     {
#         "name": "Livan",
#         "src": "https://c.rdrom.ru/js/bundles/media/livan-light.38638783d37efbfc7e87.png",
#     },
#     {
#         "name": "Lotus",
#         "src": "https://c.rdrom.ru/js/bundles/media/lotus.d25f42f58a995280759a.png",
#     },
#     {
#         "name": "Luxeed",
#         "src": "https://c.rdrom.ru/js/bundles/media/luxeed-light.e6b9dad8f577ed1017a8.png",
#     },
#     {
#         "name": "Luxgen",
#         "src": "https://c.rdrom.ru/js/bundles/media/luxgen.e7d548459ae45c675252.png",
#     },
#     {
#         "name": "Lynk & Co",
#         "src": "https://c.rdrom.ru/js/bundles/media/lynk_and_co-light.693e5ca82a354155076c.png",
#     },
#     {
#         "name": "M-Hero",
#         "src": "https://c.rdrom.ru/js/bundles/media/m-hero-light.b22e8396af2be4299f67.png",
#     },
#     {
#         "name": "Maserati",
#         "src": "https://c.rdrom.ru/js/bundles/media/maserati-light.6da2976b0ee2efeb5f03.png",
#     },
#     {
#         "name": "Maxus",
#         "src": "https://c.rdrom.ru/js/bundles/media/maxus.7c2672af15677b17ea4b.png",
#     },
#     {
#         "name": "Maybach",
#         "src": "https://c.rdrom.ru/js/bundles/media/maybach.a9d2bd38674b7bb94be2.png",
#     },
#     {
#         "name": "Mazda",
#         "src": "https://c.rdrom.ru/js/bundles/media/mazda.43a667fdcbc44a2c42a1.png",
#     },
#     {
#         "name": "McLaren",
#         "src": "https://c.rdrom.ru/js/bundles/media/mclaren-light.9b3fac071ef779604eab.png",
#     },
#     {
#         "name": "Mercedes-Benz",
#         "src": "https://c.rdrom.ru/js/bundles/media/mercedes-benz.1f112a2808e13b02b2e5.png",
#     },
#     {
#         "name": "Mercury",
#         "src": "https://c.rdrom.ru/js/bundles/media/mercury.efb8307076a3038c17b2.png",
#     },
#     {
#         "name": "MG",
#         "src": "https://c.rdrom.ru/js/bundles/media/mg-light.1dda134ee2d3c5fc9d0a.png",
#     },
#     {
#         "name": "MINI",
#         "src": "https://c.rdrom.ru/js/bundles/media/mini-light.85e35036bcd1dea5ed2d.png",
#     },
#     {
#         "name": "Mitsubishi",
#         "src": "https://c.rdrom.ru/js/bundles/media/mitsubishi.1b5e461d4945f0e126c6.png",
#     },
#     {
#         "name": "Mitsuoka",
#         "src": "https://c.rdrom.ru/js/bundles/media/mitsuoka-light.f24798d2e961b6caabfa.png",
#     },
#     {"name": "Morgan", "src": "https://i.rdrom.ru/404/empty.gif"},
#     {
#         "name": "Nio",
#         "src": "https://c.rdrom.ru/js/bundles/media/nio-light.f8a426ed76504db0a846.png",
#     },
#     {
#         "name": "Nissan",
#         "src": "https://c.rdrom.ru/js/bundles/media/nissan-light.87a537dfa99f2ae3dd41.png",
#     },
#     {
#         "name": "Oldsmobile",
#         "src": "https://c.rdrom.ru/js/bundles/media/oldsmobile.70a6857bb5aa35d38946.png",
#     },
#     {
#         "name": "OMODA",
#         "src": "https://c.rdrom.ru/js/bundles/media/omoda-light.0f5bde6f459024a7f1a9.png",
#     },
#     {
#         "name": "Opel",
#         "src": "https://c.rdrom.ru/js/bundles/media/opel-light.80ef7b12e995c5775a7b.png",
#     },
#     {
#         "name": "ORA",
#         "src": "https://c.rdrom.ru/js/bundles/media/ora-light.7f78d64cf7bf43445be7.png",
#     },
#     {
#         "name": "Oshan",
#         "src": "https://c.rdrom.ru/js/bundles/media/oshan.833170eaacc7507a3721.png",
#     },
#     {
#         "name": "Oting",
#         "src": "https://c.rdrom.ru/js/bundles/media/oting.4f9e7b3849023038183d.png",
#     },
#     {"name": "Packard", "src": "https://i.rdrom.ru/404/empty.gif"},
#     {
#         "name": "Peugeot",
#         "src": "https://c.rdrom.ru/js/bundles/media/peugeot.49726c1923bc4ae183c2.png",
#     },
#     {
#         "name": "Plymouth",
#         "src": "https://c.rdrom.ru/js/bundles/media/plymouth.5d2cfc8f966731f12fe2.png",
#     },
#     {
#         "name": "Polar Stone",
#         "src": "https://c.rdrom.ru/js/bundles/media/polar-stone-light.763e2897f1abfd372310.png",
#     },
#     {
#         "name": "Polestar",
#         "src": "https://c.rdrom.ru/js/bundles/media/polestar.9dfa31b7dd00ee5841e2.png",
#     },
#     {
#         "name": "Pontiac",
#         "src": "https://c.rdrom.ru/js/bundles/media/pontiac-light.45f77a7e3694240368f2.png",
#     },
#     {
#         "name": "Porsche",
#         "src": "https://c.rdrom.ru/js/bundles/media/porsche.837851699bce718547eb.png",
#     },
#     {
#         "name": "Proton",
#         "src": "https://c.rdrom.ru/js/bundles/media/proton.63cbadb85067ead17d9f.png",
#     },
#     {
#         "name": "RAM",
#         "src": "https://c.rdrom.ru/js/bundles/media/ram.65a1de49c7011f845b9e.png",
#     },
#     {
#         "name": "Ravon",
#         "src": "https://c.rdrom.ru/js/bundles/media/ravon.c78c508e05c706d6813c.png",
#     },
#     {
#         "name": "Renault",
#         "src": "https://c.rdrom.ru/js/bundles/media/renault-light.fc1350ea12945d160522.png",
#     },
#     {
#         "name": "Renault Samsung",
#         "src": "https://c.rdrom.ru/js/bundles/media/renault-samsung.354c969758761a54ef7f.png",
#     },
#     {
#         "name": "Rising Auto",
#         "src": "https://c.rdrom.ru/js/bundles/media/rising-auto-light.8eabb9cb04f5ce0ec61e.png",
#     },
#     {
#         "name": "Rivian",
#         "src": "https://c.rdrom.ru/js/bundles/media/rivian-light.1e33085763cb84876123.png",
#     },
#     {
#         "name": "Roewe",
#         "src": "https://c.rdrom.ru/js/bundles/media/roewe-light.a4ad89aebe1ec053269c.png",
#     },
#     {
#         "name": "Rolls-Royce",
#         "src": "https://c.rdrom.ru/js/bundles/media/rolls-royce.4124cf05b283966ba591.png",
#     },
#     {
#         "name": "Rover",
#         "src": "https://c.rdrom.ru/js/bundles/media/rover.0242a8005aab1318795d.png",
#     },
#     {
#         "name": "Rox",
#         "src": "https://c.rdrom.ru/js/bundles/media/rox-light.38f2f6f054770beec07c.png",
#     },
#     {
#         "name": "Saab",
#         "src": "https://c.rdrom.ru/js/bundles/media/saab.b9e70719e9703b9690ca.png",
#     },
#     {
#         "name": "SAIPA",
#         "src": "https://c.rdrom.ru/js/bundles/media/saipa.bae813e7068ca0892daf.png",
#     },
#     {
#         "name": "Saturn",
#         "src": "https://c.rdrom.ru/js/bundles/media/saturn.78ec4c763b3f460bc341.png",
#     },
#     {
#         "name": "Scion",
#         "src": "https://c.rdrom.ru/js/bundles/media/scion.cdd6a9c66110864c46dd.png",
#     },
#     {
#         "name": "SEAT",
#         "src": "https://c.rdrom.ru/js/bundles/media/seat.053fe12e9f265ed4e08f.png",
#     },
#     {
#         "name": "Seres",
#         "src": "https://c.rdrom.ru/js/bundles/media/seres-light.8f2b3dc7ac04d3e2d433.png",
#     },
#     {
#         "name": "Shuanghuan",
#         "src": "https://c.rdrom.ru/js/bundles/media/shuanghuan.13290dcbd72fecb162e2.png",
#     },
#     {
#         "name": "Skoda",
#         "src": "https://c.rdrom.ru/js/bundles/media/skoda.3518b191d9bf52eaf4b3.png",
#     },
#     {
#         "name": "Skywell",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/skywell.e68f45f5e3260a720a8b.png"
#         ],
#     },
#     {
#         "name": "Smart",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/smart.4d03be8710db79198594.png"
#         ],
#     },
#     {
#         "name": "Soueast",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/soueast.a668a275dbf92fc736cb.png"
#         ],
#     },
#     {
#         "name": "SRM Shineray",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/shineray-light.3186220174d3ec4c90ac.png",
#             "https://c.rdrom.ru/js/bundles/media/shineray-dark.2e3c77e83444655742e9.png",
#         ],
#     },
#     {
#         "name": "SsangYong",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/ssangyong-light.990fef72e86f4b9006af.png",
#             "https://c.rdrom.ru/js/bundles/media/ssangyong-dark.a8df0bef2635f45ce0d2.png",
#         ],
#     },
#     {
#         "name": "Subaru",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/subaru.f35c710433d25ec3b19d.png"
#         ],
#     },
#     {
#         "name": "Suzuki",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/suzuki.3f38e7beb78986325fb6.png"
#         ],
#     },
#     {
#         "name": "SWM",
#         "src": ["https://c.rdrom.ru/js/bundles/media/swm.4dfac8cc082e98a91df6.png"],
#     },
#     {
#         "name": "Tank",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/tank-light.55fd200e8230d0de2fc3.png",
#             "https://c.rdrom.ru/js/bundles/media/tank-dark.3e01d21bb1cc13beadcb.png",
#         ],
#     },
#     {
#         "name": "TATA",
#         "src": ["https://c.rdrom.ru/js/bundles/media/tata.6b6438c37ddc71caafb7.png"],
#     },
#     {"name": "Tatra", "src": ["https://i.rdrom.ru/404/empty.gif"]},
#     {
#         "name": "Tesla",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/tesla.2c7d526d2d5ef2f10817.png"
#         ],
#     },
#     {
#         "name": "Tianma",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/tianma.74ddd87473ecb3949fc2.png"
#         ],
#     },
#     {
#         "name": "Tianye",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/tianye.8698dde57951dce1f446.png"
#         ],
#     },
#     {
#         "name": "Toyota",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/toyota-light.e5d2efbc0fe39b43fa43.png",
#             "https://c.rdrom.ru/js/bundles/media/toyota-dark.7fa5678b8f28250f0511.png",
#         ],
#     },
#     {
#         "name": "Trabant",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/trabant-light.819a1b6391c1180ad4c5.png",
#             "https://c.rdrom.ru/js/bundles/media/trabant-dark.2c91ca0627ad31be5c44.png",
#         ],
#     },
#     {"name": "Vauxhall", "src": ["https://i.rdrom.ru/404/empty.gif"]},
#     {
#         "name": "Venucia",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/venucia.770d3369af7d4523144f.png"
#         ],
#     },
#     {
#         "name": "VGV",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/vgv-light.5b244a122ac6588ec64a.png",
#             "https://c.rdrom.ru/js/bundles/media/vgv-dark.e4053bbafd7a2396370e.png",
#         ],
#     },
#     {
#         "name": "Volkswagen",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/volkswagen-light.0018f014092337ece455.png",
#             "https://c.rdrom.ru/js/bundles/media/volkswagen-dark.9d94c4c2de4e0cd12877.png",
#         ],
#     },
#     {
#         "name": "Volvo",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/volvo-light.58f0499e635b34b46e28.png",
#             "https://c.rdrom.ru/js/bundles/media/volvo-dark.26d51ec75ecadf47f9a2.png",
#         ],
#     },
#     {
#         "name": "Vortex",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/vortex-light.f8440bc69c6fb72e8045.png",
#             "https://c.rdrom.ru/js/bundles/media/vortex-dark.32f46dfa096a22eb1d47.png",
#         ],
#     },
#     {
#         "name": "Voyah",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/voyah-light.ae7405c9662b6d90f707.png",
#             "https://c.rdrom.ru/js/bundles/media/voyah-dark.a34c16bb3bec1d31c8fd.png",
#         ],
#     },
#     {
#         "name": "Wartburg",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/wartburg.4620071b48b3470583cb.png"
#         ],
#     },
#     {
#         "name": "Weltmeister",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/weltmeister-light.eadfb07608d43ab185b8.png",
#             "https://c.rdrom.ru/js/bundles/media/weltmeister-dark.161d1bd3f45f4a15d4f1.png",
#         ],
#     },
#     {
#         "name": "WEY",
#         "src": ["https://c.rdrom.ru/js/bundles/media/wey.0149037cfc26aa1e121c.png"],
#     },
#     {
#         "name": "Wuling",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/wuling.a3ba45a05183550b8946.png"
#         ],
#     },
#     {
#         "name": "Xiaomi",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/xiaomi.04324c783c24573ccec9.png"
#         ],
#     },
#     {
#         "name": "Xin Kai",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/xin-kai-light.ee20ab8cc69ed989636d.png",
#             "https://c.rdrom.ru/js/bundles/media/xin-kai-dark.0a9782d4c5bb5ea1c0bf.png",
#         ],
#     },
#     {
#         "name": "Xpeng",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/xpeng-light.cbfca67115294b2c794f.png",
#             "https://c.rdrom.ru/js/bundles/media/xpeng-dark.73cb7130a74729d4799a.png",
#         ],
#     },
#     {
#         "name": "Yema",
#         "src": ["https://c.rdrom.ru/js/bundles/media/yema.7f5369eb4ce6f4d090bd.png"],
#     },
#     {
#         "name": "Zeekr",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/zeekr-light.bc11ef25634e702ce7a2.png",
#             "https://c.rdrom.ru/js/bundles/media/zeekr-dark.fdd3991178b755c1db93.png",
#         ],
#     },
#     {
#         "name": "Zotye",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/zotye.fb9a2744758c17f615da.png"
#         ],
#     },
#     {
#         "name": "ZX",
#         "src": ["https://c.rdrom.ru/js/bundles/media/zx.3abd4f5b2840ce55386b.png"],
#     },
#     {
#         "name": "Marussia",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/marussia.89782e4879f5412b8634.png"
#         ],
#     },
#     {
#         "name": "Solaris",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/solaris-light.76f5e3724b6c54dab22e.png",
#             "https://c.rdrom.ru/js/bundles/media/solaris-dark.c0ae2aad033e1481ca52.png",
#         ],
#     },
#     {"name": "Tenet", "src": ["https://i.rdrom.ru/404/empty.gif"]},
#     {
#         "name": "Xcite",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/xcite-light.532026594450bcbb0d82.png",
#             "https://c.rdrom.ru/js/bundles/media/xcite-dark.245921a01617bda2e2f3.png",
#         ],
#     },
#     {
#         "name": "Амберавто",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/amberauto-light.2121ae9f99de754f9e35.png",
#             "https://c.rdrom.ru/js/bundles/media/amberauto-dark.d4e0e1c2bbebd8b39c66.png",
#         ],
#     },
#     {
#         "name": "Амбертрак",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/ambertruck.42dfcff058b89a85da94.png"
#         ],
#     },
#     {
#         "name": "Аурус",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/aurus.e527b9758750f77617d1.png"
#         ],
#     },
#     {
#         "name": "Богдан",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/bogdan.f15f7c6de2ce0d8d9aa0.png"
#         ],
#     },
#     {
#         "name": "Волга",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/volga.ecb7b116b008afc36c90.png"
#         ],
#     },
#     {
#         "name": "ГАЗ",
#         "src": ["https://c.rdrom.ru/js/bundles/media/gaz.c43dcf358f8041811cc8.png"],
#     },
#     {
#         "name": "Донинвест",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/doninvest.3d3a53a4401ed7ac75a2.png"
#         ],
#     },
#     {
#         "name": "ЗАЗ",
#         "src": ["https://c.rdrom.ru/js/bundles/media/zaz.991e462e769e7a1700c9.png"],
#     },
#     {
#         "name": "ЗИЛ",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/zil-light.5b33e38e66c701c671e8.png",
#             "https://c.rdrom.ru/js/bundles/media/zil-dark.d4552f8413136079ba55.png",
#         ],
#     },
#     {
#         "name": "ЗиС",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/zis-light.8606cd0ef9b9cb5f7b75.png",
#             "https://c.rdrom.ru/js/bundles/media/zis-dark.fca60c8f2e9079a290a7.png",
#         ],
#     },
#     {
#         "name": "ИЖ",
#         "src": ["https://c.rdrom.ru/js/bundles/media/izh.39802ff74d2c4f90788c.png"],
#     },
#     {
#         "name": "Лада",
#         "src": ["https://c.rdrom.ru/js/bundles/media/lada.d7b303a0cddaf20da89a.png"],
#     },
#     {
#         "name": "ЛуАЗ",
#         "src": ["https://c.rdrom.ru/js/bundles/media/luaz.d90404dc3d92c77f82fe.png"],
#     },
#     {
#         "name": "Москвич",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/moskvich.20f208e2630fd0bfda13.png"
#         ],
#     },
#     {
#         "name": "Соллерс",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/sollers.153643db1f470e164dd5.png"
#         ],
#     },
#     {
#         "name": "ТагАЗ",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/tagaz.8c30bc06d060e30048ed.png"
#         ],
#     },
#     {
#         "name": "УАЗ",
#         "src": ["https://c.rdrom.ru/js/bundles/media/uaz.07ccd1ec4662413d5788.png"],
#     },
#     {
#         "name": "Эволют",
#         "src": [
#             "https://c.rdrom.ru/js/bundles/media/evolute-light.cff4e9f73731f3e6fd9f.png",
#             "https://c.rdrom.ru/js/bundles/media/evolute-dark.d823f1b0b859418e7e19.png",
#         ],
#     },
# ]

# # Folder to save downloaded icons
# output_folder = "icons"
# os.makedirs(output_folder, exist_ok=True)


# # Download function
# def download_icons(data):
#     res = {}
#     for item in data:
#         name = item["name"]
#         s = item["src"] if isinstance(item["src"], list) else [item["src"]]
#         for idx, url in enumerate(s):

#             s_url = url.split("/")
#             n = s_url[-1]

#             filename = n
#             filepath = os.path.join(output_folder, filename)

#             try:
#                 response = requests.get(url)
#                 response.raise_for_status()
#                 with open(filepath, "wb") as f:
#                     f.write(response.content)
#                 print(f"Downloaded {filename}")
#             except requests.RequestException as e:
#                 print(f"Failed to download {url}: {e}")

#             if name in res:
#                 res[name]['src'].append(url)
#             else:
#                 res[name] = {
#                     'name': name,
#                     'filename': filename,
#                     'filepath': filepath,
#                     'src': [url]
#                 }
#     print(res)
#     print(json.dumps(res))


# # Run the download
# download_icons(data)


import json


a = {
    "Abarth": {
        "name": "Abarth",
        "filename": "abarth.7429bd58ee80921494fb.png",
        "filepath": "icons/abarth.7429bd58ee80921494fb.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/abarth.7429bd58ee80921494fb.png"],
    },
    "AC": {
        "name": "AC",
        "filename": "ac-light.1d02f52da2c1274fc706.png",
        "filepath": "icons/ac-light.1d02f52da2c1274fc706.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/ac-light.1d02f52da2c1274fc706.png",
            "https://c.rdrom.ru/js/bundles/media/ac-dark.128be8a37abd53383cae.png",
        ],
    },
    "Acura": {
        "name": "Acura",
        "filename": "acura.d3ac4a7ccad16ed7a225.png",
        "filepath": "icons/acura.d3ac4a7ccad16ed7a225.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/acura.d3ac4a7ccad16ed7a225.png"],
    },
    "AITO": {
        "name": "AITO",
        "filename": "aito-light.52815da0bf3e0c0a2f4a.png",
        "filepath": "icons/aito-light.52815da0bf3e0c0a2f4a.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/aito-light.52815da0bf3e0c0a2f4a.png",
            "https://c.rdrom.ru/js/bundles/media/aito-dark.5b1d6c39ed52a39f4b3c.png",
        ],
    },
    "Alfa Romeo": {
        "name": "Alfa Romeo",
        "filename": "alfa-romeo.1e99c67bfd858f986fba.png",
        "filepath": "icons/alfa-romeo.1e99c67bfd858f986fba.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/alfa-romeo.1e99c67bfd858f986fba.png"
        ],
    },
    "Alpina": {
        "name": "Alpina",
        "filename": "alpina.561d1eea566f16232f54.png",
        "filepath": "icons/alpina.561d1eea566f16232f54.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/alpina.561d1eea566f16232f54.png"],
    },
    "Alpine": {
        "name": "Alpine",
        "filename": "alpine.2d1a428730d77af6ad0e.png",
        "filepath": "icons/alpine.2d1a428730d77af6ad0e.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/alpine.2d1a428730d77af6ad0e.png"],
    },
    "AMC": {
        "name": "AMC",
        "filename": "empty.gif",
        "filepath": "icons/empty.gif",
        "src": ["https://i.rdrom.ru/404/empty.gif"],
    },
    "Aro": {
        "name": "Aro",
        "filename": "aro-light.0252f506fd4ab052e30b.png",
        "filepath": "icons/aro-light.0252f506fd4ab052e30b.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/aro-light.0252f506fd4ab052e30b.png",
            "https://c.rdrom.ru/js/bundles/media/aro-dark.6aa7c171d1469956fbab.png",
        ],
    },
    "Asia": {
        "name": "Asia",
        "filename": "asia.830e4d038a4522216862.png",
        "filepath": "icons/asia.830e4d038a4522216862.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/asia.830e4d038a4522216862.png"],
    },
    "Aston Martin": {
        "name": "Aston Martin",
        "filename": "astonmartin-light.57c247de83ca6954903c.png",
        "filepath": "icons/astonmartin-light.57c247de83ca6954903c.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/astonmartin-light.57c247de83ca6954903c.png",
            "https://c.rdrom.ru/js/bundles/media/astonmartin-dark.80fe21686cf6ce8c8d31.png",
        ],
    },
    "Audi": {
        "name": "Audi",
        "filename": "audi-light.766b5d397af6a9784156.png",
        "filepath": "icons/audi-light.766b5d397af6a9784156.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/audi-light.766b5d397af6a9784156.png",
            "https://c.rdrom.ru/js/bundles/media/audi-dark.412a6c475d41128aaac0.png",
        ],
    },
    "Avatr": {
        "name": "Avatr",
        "filename": "avatr-light.f20b9484318576b318fb.png",
        "filepath": "icons/avatr-light.f20b9484318576b318fb.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/avatr-light.f20b9484318576b318fb.png",
            "https://c.rdrom.ru/js/bundles/media/avatr-dark.d02cea9a04aaea45cc09.png",
        ],
    },
    "BAIC": {
        "name": "BAIC",
        "filename": "baic.174ec57728ddc494a724.png",
        "filepath": "icons/baic.174ec57728ddc494a724.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/baic.174ec57728ddc494a724.png"],
    },
    "Baojun": {
        "name": "Baojun",
        "filename": "baojun.b74bac7bd5bf56e3a230.png",
        "filepath": "icons/baojun.b74bac7bd5bf56e3a230.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/baojun.b74bac7bd5bf56e3a230.png"],
    },
    "BAW": {
        "name": "BAW",
        "filename": "baw.32d7399b3f84446ceaaf.png",
        "filepath": "icons/baw.32d7399b3f84446ceaaf.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/baw.32d7399b3f84446ceaaf.png"],
    },
    "Belgee": {
        "name": "Belgee",
        "filename": "belgee.0a260320007632d434ff.png",
        "filepath": "icons/belgee.0a260320007632d434ff.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/belgee.0a260320007632d434ff.png"],
    },
    "Bentley": {
        "name": "Bentley",
        "filename": "bentley.704286eb468a58d7ad6d.png",
        "filepath": "icons/bentley.704286eb468a58d7ad6d.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/bentley.704286eb468a58d7ad6d.png"],
    },
    "Bestune": {
        "name": "Bestune",
        "filename": "empty.gif",
        "filepath": "icons/empty.gif",
        "src": ["https://i.rdrom.ru/404/empty.gif"],
    },
    "BMW": {
        "name": "BMW",
        "filename": "bmw-light.63c8532776357e9102c6.png",
        "filepath": "icons/bmw-light.63c8532776357e9102c6.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/bmw-light.63c8532776357e9102c6.png",
            "https://c.rdrom.ru/js/bundles/media/bmw-dark.6e7e6fa021ed9c70c42c.png",
        ],
    },
    "Borgward": {
        "name": "Borgward",
        "filename": "borgward.a4b858535a106f54a293.png",
        "filepath": "icons/borgward.a4b858535a106f54a293.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/borgward.a4b858535a106f54a293.png"
        ],
    },
    "Brilliance": {
        "name": "Brilliance",
        "filename": "brilliance.70a38ed01fd4f4e1e0dc.png",
        "filepath": "icons/brilliance.70a38ed01fd4f4e1e0dc.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/brilliance.70a38ed01fd4f4e1e0dc.png"
        ],
    },
    "Bugatti": {
        "name": "Bugatti",
        "filename": "bugatti.a210cd8c7de53235bc83.png",
        "filepath": "icons/bugatti.a210cd8c7de53235bc83.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/bugatti.a210cd8c7de53235bc83.png"],
    },
    "Buick": {
        "name": "Buick",
        "filename": "buick.ca0914d97d396d642516.png",
        "filepath": "icons/buick.ca0914d97d396d642516.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/buick.ca0914d97d396d642516.png"],
    },
    "BYD": {
        "name": "BYD",
        "filename": "byd.89e07334e36d65c29d67.png",
        "filepath": "icons/byd.89e07334e36d65c29d67.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/byd.89e07334e36d65c29d67.png"],
    },
    "Cadillac": {
        "name": "Cadillac",
        "filename": "cadillac.bbb37d569e944934c45a.png",
        "filepath": "icons/cadillac.bbb37d569e944934c45a.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/cadillac.bbb37d569e944934c45a.png"
        ],
    },
    "Changan": {
        "name": "Changan",
        "filename": "changan.abaf17deda8b92f839e9.png",
        "filepath": "icons/changan.abaf17deda8b92f839e9.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/changan.abaf17deda8b92f839e9.png"],
    },
    "Changfeng": {
        "name": "Changfeng",
        "filename": "changfeng.2b945b6e3e4a1a2ddc12.png",
        "filepath": "icons/changfeng.2b945b6e3e4a1a2ddc12.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/changfeng.2b945b6e3e4a1a2ddc12.png"
        ],
    },
    "Changhe": {
        "name": "Changhe",
        "filename": "changhe.083630a057395c063c6c.png",
        "filepath": "icons/changhe.083630a057395c063c6c.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/changhe.083630a057395c063c6c.png"],
    },
    "Chery": {
        "name": "Chery",
        "filename": "chery.41871b3805a2dbf160d5.png",
        "filepath": "icons/chery.41871b3805a2dbf160d5.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/chery.41871b3805a2dbf160d5.png"],
    },
    "Chevrolet": {
        "name": "Chevrolet",
        "filename": "chevrolet.1833f79352ce503b08c9.png",
        "filepath": "icons/chevrolet.1833f79352ce503b08c9.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/chevrolet.1833f79352ce503b08c9.png"
        ],
    },
    "Chrysler": {
        "name": "Chrysler",
        "filename": "chrysler.f44ea6644db8e176ddf9.png",
        "filepath": "icons/chrysler.f44ea6644db8e176ddf9.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/chrysler.f44ea6644db8e176ddf9.png"
        ],
    },
    "Citroen": {
        "name": "Citroen",
        "filename": "citroen-light.de79eff21bbc40a7b08f.png",
        "filepath": "icons/citroen-light.de79eff21bbc40a7b08f.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/citroen-light.de79eff21bbc40a7b08f.png",
            "https://c.rdrom.ru/js/bundles/media/citroen-dark.8af2ce212e61c8ea0615.png",
        ],
    },
    "Cupra": {
        "name": "Cupra",
        "filename": "cupra-light.ad5065ebb5787b4d94e5.png",
        "filepath": "icons/cupra-light.ad5065ebb5787b4d94e5.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/cupra-light.ad5065ebb5787b4d94e5.png",
            "https://c.rdrom.ru/js/bundles/media/cupra-dark.1d5beaa9f8053bd734b3.png",
        ],
    },
    "Dacia": {
        "name": "Dacia",
        "filename": "dacia-light.9a8d9bf5d1bc45b942e1.png",
        "filepath": "icons/dacia-light.9a8d9bf5d1bc45b942e1.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/dacia-light.9a8d9bf5d1bc45b942e1.png",
            "https://c.rdrom.ru/js/bundles/media/dacia-dark.efffb7eac5864f43a602.png",
        ],
    },
    "Dadi": {
        "name": "Dadi",
        "filename": "dadi.b7fff19f394e9ff94cda.png",
        "filepath": "icons/dadi.b7fff19f394e9ff94cda.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/dadi.b7fff19f394e9ff94cda.png"],
    },
    "Daewoo": {
        "name": "Daewoo",
        "filename": "daewoo.590f87a8ecef73f94e62.png",
        "filepath": "icons/daewoo.590f87a8ecef73f94e62.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/daewoo.590f87a8ecef73f94e62.png"],
    },
    "Daihatsu": {
        "name": "Daihatsu",
        "filename": "daihatsu.0e8719e49df2d2d07a1d.png",
        "filepath": "icons/daihatsu.0e8719e49df2d2d07a1d.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/daihatsu.0e8719e49df2d2d07a1d.png"
        ],
    },
    "Datsun": {
        "name": "Datsun",
        "filename": "datsun.d76215d8d955cf3dfbc4.png",
        "filepath": "icons/datsun.d76215d8d955cf3dfbc4.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/datsun.d76215d8d955cf3dfbc4.png"],
    },
    "Dayun": {
        "name": "Dayun",
        "filename": "dayun.e42c06fce71058fa7c2f.png",
        "filepath": "icons/dayun.e42c06fce71058fa7c2f.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/dayun.e42c06fce71058fa7c2f.png"],
    },
    "Denza": {
        "name": "Denza",
        "filename": "denza.badef76c051d1a6d1559.png",
        "filepath": "icons/denza.badef76c051d1a6d1559.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/denza.badef76c051d1a6d1559.png"],
    },
    "Derways": {
        "name": "Derways",
        "filename": "derways.f8f50e0f56e03cd9b47b.png",
        "filepath": "icons/derways.f8f50e0f56e03cd9b47b.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/derways.f8f50e0f56e03cd9b47b.png"],
    },
    "Dodge": {
        "name": "Dodge",
        "filename": "dodge-light.3334dc84ae58494f8c55.png",
        "filepath": "icons/dodge-light.3334dc84ae58494f8c55.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/dodge-light.3334dc84ae58494f8c55.png",
            "https://c.rdrom.ru/js/bundles/media/dodge-dark.4c24bf62ea82e7a13588.png",
        ],
    },
    "Dongfeng": {
        "name": "Dongfeng",
        "filename": "dongfeng.ecc2988b1e15e97b4281.png",
        "filepath": "icons/dongfeng.ecc2988b1e15e97b4281.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/dongfeng.ecc2988b1e15e97b4281.png"
        ],
    },
    "DW Hower": {
        "name": "DW Hower",
        "filename": "dw-hower.fd099650186e285709cb.png",
        "filepath": "icons/dw-hower.fd099650186e285709cb.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/dw-hower.fd099650186e285709cb.png"
        ],
    },
    "Eagle": {
        "name": "Eagle",
        "filename": "eagle.033bf3da0d8a9b80b29c.png",
        "filepath": "icons/eagle.033bf3da0d8a9b80b29c.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/eagle.033bf3da0d8a9b80b29c.png"],
    },
    "EXEED": {
        "name": "EXEED",
        "filename": "exeed.ed2f74d051508155670f.png",
        "filepath": "icons/exeed.ed2f74d051508155670f.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/exeed.ed2f74d051508155670f.png"],
    },
    "FAW": {
        "name": "FAW",
        "filename": "faw.01ed4c6a199bef7dc440.png",
        "filepath": "icons/faw.01ed4c6a199bef7dc440.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/faw.01ed4c6a199bef7dc440.png"],
    },
    "Ferrari": {
        "name": "Ferrari",
        "filename": "ferrari.28b8c3d886bf65723f59.png",
        "filepath": "icons/ferrari.28b8c3d886bf65723f59.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/ferrari.28b8c3d886bf65723f59.png"],
    },
    "Fiat": {
        "name": "Fiat",
        "filename": "fiat.2060f0b7c931db934113.png",
        "filepath": "icons/fiat.2060f0b7c931db934113.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/fiat.2060f0b7c931db934113.png"],
    },
    "Ford": {
        "name": "Ford",
        "filename": "ford.5258a60d3e04d9c73d14.png",
        "filepath": "icons/ford.5258a60d3e04d9c73d14.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/ford.5258a60d3e04d9c73d14.png"],
    },
    "Forthing": {
        "name": "Forthing",
        "filename": "forthing.5ca71c3b20bc3addc149.png",
        "filepath": "icons/forthing.5ca71c3b20bc3addc149.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/forthing.5ca71c3b20bc3addc149.png"
        ],
    },
    "Foton": {
        "name": "Foton",
        "filename": "foton.41870011918ea443543f.png",
        "filepath": "icons/foton.41870011918ea443543f.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/foton.41870011918ea443543f.png"],
    },
    "FSO": {
        "name": "FSO",
        "filename": "empty.gif",
        "filepath": "icons/empty.gif",
        "src": ["https://i.rdrom.ru/404/empty.gif"],
    },
    "GAC": {
        "name": "GAC",
        "filename": "gac.ac3938fc3cc2c63ad0cd.png",
        "filepath": "icons/gac.ac3938fc3cc2c63ad0cd.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/gac.ac3938fc3cc2c63ad0cd.png"],
    },
    "Geely": {
        "name": "Geely",
        "filename": "geely-light.7210d09d28fa8a4d4383.png",
        "filepath": "icons/geely-light.7210d09d28fa8a4d4383.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/geely-light.7210d09d28fa8a4d4383.png"
        ],
    },
    "Genesis": {
        "name": "Genesis",
        "filename": "genesis.e0980297c899f2837984.png",
        "filepath": "icons/genesis.e0980297c899f2837984.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/genesis.e0980297c899f2837984.png"],
    },
    "Geo": {
        "name": "Geo",
        "filename": "geo.c23c86d2b5051d0df5b4.png",
        "filepath": "icons/geo.c23c86d2b5051d0df5b4.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/geo.c23c86d2b5051d0df5b4.png"],
    },
    "GMC": {
        "name": "GMC",
        "filename": "gmc.45ca4c41396bc782ef6a.png",
        "filepath": "icons/gmc.45ca4c41396bc782ef6a.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/gmc.45ca4c41396bc782ef6a.png"],
    },
    "Great Wall": {
        "name": "Great Wall",
        "filename": "great-wall.74fcdba1af4834309f37.png",
        "filepath": "icons/great-wall.74fcdba1af4834309f37.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/great-wall.74fcdba1af4834309f37.png"
        ],
    },
    "Hafei": {
        "name": "Hafei",
        "filename": "hafei.d02e9989e6abe170ab3e.png",
        "filepath": "icons/hafei.d02e9989e6abe170ab3e.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/hafei.d02e9989e6abe170ab3e.png"],
    },
    "Haima": {
        "name": "Haima",
        "filename": "haima.ad0aaaab2ad0c7c421e6.png",
        "filepath": "icons/haima.ad0aaaab2ad0c7c421e6.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/haima.ad0aaaab2ad0c7c421e6.png"],
    },
    "Haval": {
        "name": "Haval",
        "filename": "haval-light.a9694b958caf1a856960.png",
        "filepath": "icons/haval-light.a9694b958caf1a856960.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/haval-light.a9694b958caf1a856960.png"
        ],
    },
    "Hawtai": {
        "name": "Hawtai",
        "filename": "hawtai.d576b5dd8b1ea50b948d.png",
        "filepath": "icons/hawtai.d576b5dd8b1ea50b948d.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/hawtai.d576b5dd8b1ea50b948d.png"],
    },
    "HiPhi": {
        "name": "HiPhi",
        "filename": "hiphi-light.daca174a08f38f185256.png",
        "filepath": "icons/hiphi-light.daca174a08f38f185256.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/hiphi-light.daca174a08f38f185256.png"
        ],
    },
    "Honda": {
        "name": "Honda",
        "filename": "honda.90a9c276ea492b5a7dc8.png",
        "filepath": "icons/honda.90a9c276ea492b5a7dc8.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/honda.90a9c276ea492b5a7dc8.png"],
    },
    "Hongqi": {
        "name": "Hongqi",
        "filename": "hongqi.cf20689ad2f0ceaa4101.png",
        "filepath": "icons/hongqi.cf20689ad2f0ceaa4101.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/hongqi.cf20689ad2f0ceaa4101.png"],
    },
    "Hozon": {
        "name": "Hozon",
        "filename": "hozon-light.31f50419b7e6ea6f3839.png",
        "filepath": "icons/hozon-light.31f50419b7e6ea6f3839.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/hozon-light.31f50419b7e6ea6f3839.png"
        ],
    },
    "Huanghai": {
        "name": "Huanghai",
        "filename": "huanghai.3b3da7b13696942b5a23.png",
        "filepath": "icons/huanghai.3b3da7b13696942b5a23.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/huanghai.3b3da7b13696942b5a23.png"
        ],
    },
    "Hummer": {
        "name": "Hummer",
        "filename": "hummer-light.43f8937d20e45e274b20.png",
        "filepath": "icons/hummer-light.43f8937d20e45e274b20.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/hummer-light.43f8937d20e45e274b20.png"
        ],
    },
    "Hyundai": {
        "name": "Hyundai",
        "filename": "hyundai-light.59fefbb0a7afd5336324.png",
        "filepath": "icons/hyundai-light.59fefbb0a7afd5336324.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/hyundai-light.59fefbb0a7afd5336324.png"
        ],
    },
    "iCAR": {
        "name": "iCAR",
        "filename": "i-car-light.5acd70209347912d0988.png",
        "filepath": "icons/i-car-light.5acd70209347912d0988.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/i-car-light.5acd70209347912d0988.png"
        ],
    },
    "IM Motors": {
        "name": "IM Motors",
        "filename": "im-motors-light.d5ecb7cca2a8f167216c.png",
        "filepath": "icons/im-motors-light.d5ecb7cca2a8f167216c.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/im-motors-light.d5ecb7cca2a8f167216c.png"
        ],
    },
    "Ineos": {
        "name": "Ineos",
        "filename": "empty.gif",
        "filepath": "icons/empty.gif",
        "src": ["https://i.rdrom.ru/404/empty.gif"],
    },
    "Infiniti": {
        "name": "Infiniti",
        "filename": "infiniti.a44b9412fdb2f075783b.png",
        "filepath": "icons/infiniti.a44b9412fdb2f075783b.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/infiniti.a44b9412fdb2f075783b.png"
        ],
    },
    "Iran Khodro": {
        "name": "Iran Khodro",
        "filename": "iran-khodro.43872a9ce1dbc2feeb7e.png",
        "filepath": "icons/iran-khodro.43872a9ce1dbc2feeb7e.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/iran-khodro.43872a9ce1dbc2feeb7e.png"
        ],
    },
    "Isuzu": {
        "name": "Isuzu",
        "filename": "isuzu.cf0892e73d53a554ba64.png",
        "filepath": "icons/isuzu.cf0892e73d53a554ba64.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/isuzu.cf0892e73d53a554ba64.png"],
    },
    "IVECO": {
        "name": "IVECO",
        "filename": "iveco.96f3a76c2bc6052462fa.png",
        "filepath": "icons/iveco.96f3a76c2bc6052462fa.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/iveco.96f3a76c2bc6052462fa.png"],
    },
    "JAC": {
        "name": "JAC",
        "filename": "jac.0496d3a4020dc0156a5e.png",
        "filepath": "icons/jac.0496d3a4020dc0156a5e.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/jac.0496d3a4020dc0156a5e.png"],
    },
    "Jaecoo": {
        "name": "Jaecoo",
        "filename": "jaecoo-light.fc40804a43624c6171fd.png",
        "filepath": "icons/jaecoo-light.fc40804a43624c6171fd.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/jaecoo-light.fc40804a43624c6171fd.png"
        ],
    },
    "Jaguar": {
        "name": "Jaguar",
        "filename": "jaguar.2a704c844655ac4de7ed.png",
        "filepath": "icons/jaguar.2a704c844655ac4de7ed.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/jaguar.2a704c844655ac4de7ed.png"],
    },
    "Jeep": {
        "name": "Jeep",
        "filename": "jeep.6ab14a41621a6db3176e.png",
        "filepath": "icons/jeep.6ab14a41621a6db3176e.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/jeep.6ab14a41621a6db3176e.png"],
    },
    "Jetour": {
        "name": "Jetour",
        "filename": "jetour-light.1fc542e299ece0cb1b1c.png",
        "filepath": "icons/jetour-light.1fc542e299ece0cb1b1c.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/jetour-light.1fc542e299ece0cb1b1c.png"
        ],
    },
    "Jetta": {
        "name": "Jetta",
        "filename": "jetta-light.795102d682a0c0d00d85.png",
        "filepath": "icons/jetta-light.795102d682a0c0d00d85.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/jetta-light.795102d682a0c0d00d85.png"
        ],
    },
    "Jidu": {
        "name": "Jidu",
        "filename": "jidu-light.728f7f2d3db3355316c4.png",
        "filepath": "icons/jidu-light.728f7f2d3db3355316c4.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/jidu-light.728f7f2d3db3355316c4.png"
        ],
    },
    "Jinbei": {
        "name": "Jinbei",
        "filename": "jinbei.43cf9885bfca63489eb8.png",
        "filepath": "icons/jinbei.43cf9885bfca63489eb8.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/jinbei.43cf9885bfca63489eb8.png"],
    },
    "JMC": {
        "name": "JMC",
        "filename": "jmc.236760390a2d7c87534a.png",
        "filepath": "icons/jmc.236760390a2d7c87534a.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/jmc.236760390a2d7c87534a.png"],
    },
    "Kaiyi": {
        "name": "Kaiyi",
        "filename": "kaiyi-light.f20fab86f2ce02877d4f.png",
        "filepath": "icons/kaiyi-light.f20fab86f2ce02877d4f.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/kaiyi-light.f20fab86f2ce02877d4f.png"
        ],
    },
    "KG Mobility": {
        "name": "KG Mobility",
        "filename": "kgm-light.7fe96642d3b7b34f023a.png",
        "filepath": "icons/kgm-light.7fe96642d3b7b34f023a.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/kgm-light.7fe96642d3b7b34f023a.png"
        ],
    },
    "Kia": {
        "name": "Kia",
        "filename": "kia-light.d11a15a00d5e360c840e.png",
        "filepath": "icons/kia-light.d11a15a00d5e360c840e.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/kia-light.d11a15a00d5e360c840e.png"
        ],
    },
    "Knewstar": {
        "name": "Knewstar",
        "filename": "knewstar-light.fab839646ff750ee2256.png",
        "filepath": "icons/knewstar-light.fab839646ff750ee2256.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/knewstar-light.fab839646ff750ee2256.png"
        ],
    },
    "Kuayue": {
        "name": "Kuayue",
        "filename": "kuayue.3cf3c248f6027fad0dce.png",
        "filepath": "icons/kuayue.3cf3c248f6027fad0dce.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/kuayue.3cf3c248f6027fad0dce.png"],
    },
    "Lamborghini": {
        "name": "Lamborghini",
        "filename": "lamborghini.74b1e6f84818a0bdce7a.png",
        "filepath": "icons/lamborghini.74b1e6f84818a0bdce7a.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/lamborghini.74b1e6f84818a0bdce7a.png"
        ],
    },
    "Lancia": {
        "name": "Lancia",
        "filename": "lancia.89f35541217e1fc07c14.png",
        "filepath": "icons/lancia.89f35541217e1fc07c14.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/lancia.89f35541217e1fc07c14.png"],
    },
    "Land Rover": {
        "name": "Land Rover",
        "filename": "land-rover.0808fbea3421388836aa.png",
        "filepath": "icons/land-rover.0808fbea3421388836aa.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/land-rover.0808fbea3421388836aa.png"
        ],
    },
    "Landwind": {
        "name": "Landwind",
        "filename": "landwind-light.7811c2acd4b3fb9430ec.png",
        "filepath": "icons/landwind-light.7811c2acd4b3fb9430ec.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/landwind-light.7811c2acd4b3fb9430ec.png"
        ],
    },
    "Leapmotor": {
        "name": "Leapmotor",
        "filename": "leapmotor-light.a85f0975621c3cb525bd.png",
        "filepath": "icons/leapmotor-light.a85f0975621c3cb525bd.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/leapmotor-light.a85f0975621c3cb525bd.png"
        ],
    },
    "Lexus": {
        "name": "Lexus",
        "filename": "lexus.b635e5e8050f687d5c2f.png",
        "filepath": "icons/lexus.b635e5e8050f687d5c2f.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/lexus.b635e5e8050f687d5c2f.png"],
    },
    "Li": {
        "name": "Li",
        "filename": "li-light.d159dff9e1b4422d9042.png",
        "filepath": "icons/li-light.d159dff9e1b4422d9042.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/li-light.d159dff9e1b4422d9042.png"
        ],
    },
    "Lifan": {
        "name": "Lifan",
        "filename": "lifan-light.b12096988144f5d8f53a.png",
        "filepath": "icons/lifan-light.b12096988144f5d8f53a.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/lifan-light.b12096988144f5d8f53a.png"
        ],
    },
    "Lincoln": {
        "name": "Lincoln",
        "filename": "lincoln-light.d0d9b87d9884340da5fa.png",
        "filepath": "icons/lincoln-light.d0d9b87d9884340da5fa.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/lincoln-light.d0d9b87d9884340da5fa.png"
        ],
    },
    "Livan": {
        "name": "Livan",
        "filename": "livan-light.38638783d37efbfc7e87.png",
        "filepath": "icons/livan-light.38638783d37efbfc7e87.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/livan-light.38638783d37efbfc7e87.png"
        ],
    },
    "Lotus": {
        "name": "Lotus",
        "filename": "lotus.d25f42f58a995280759a.png",
        "filepath": "icons/lotus.d25f42f58a995280759a.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/lotus.d25f42f58a995280759a.png"],
    },
    "Luxeed": {
        "name": "Luxeed",
        "filename": "luxeed-light.e6b9dad8f577ed1017a8.png",
        "filepath": "icons/luxeed-light.e6b9dad8f577ed1017a8.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/luxeed-light.e6b9dad8f577ed1017a8.png"
        ],
    },
    "Luxgen": {
        "name": "Luxgen",
        "filename": "luxgen.e7d548459ae45c675252.png",
        "filepath": "icons/luxgen.e7d548459ae45c675252.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/luxgen.e7d548459ae45c675252.png"],
    },
    "Lynk & Co": {
        "name": "Lynk & Co",
        "filename": "lynk_and_co-light.693e5ca82a354155076c.png",
        "filepath": "icons/lynk_and_co-light.693e5ca82a354155076c.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/lynk_and_co-light.693e5ca82a354155076c.png"
        ],
    },
    "M-Hero": {
        "name": "M-Hero",
        "filename": "m-hero-light.b22e8396af2be4299f67.png",
        "filepath": "icons/m-hero-light.b22e8396af2be4299f67.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/m-hero-light.b22e8396af2be4299f67.png"
        ],
    },
    "Maserati": {
        "name": "Maserati",
        "filename": "maserati-light.6da2976b0ee2efeb5f03.png",
        "filepath": "icons/maserati-light.6da2976b0ee2efeb5f03.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/maserati-light.6da2976b0ee2efeb5f03.png"
        ],
    },
    "Maxus": {
        "name": "Maxus",
        "filename": "maxus.7c2672af15677b17ea4b.png",
        "filepath": "icons/maxus.7c2672af15677b17ea4b.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/maxus.7c2672af15677b17ea4b.png"],
    },
    "Maybach": {
        "name": "Maybach",
        "filename": "maybach.a9d2bd38674b7bb94be2.png",
        "filepath": "icons/maybach.a9d2bd38674b7bb94be2.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/maybach.a9d2bd38674b7bb94be2.png"],
    },
    "Mazda": {
        "name": "Mazda",
        "filename": "mazda.43a667fdcbc44a2c42a1.png",
        "filepath": "icons/mazda.43a667fdcbc44a2c42a1.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/mazda.43a667fdcbc44a2c42a1.png"],
    },
    "McLaren": {
        "name": "McLaren",
        "filename": "mclaren-light.9b3fac071ef779604eab.png",
        "filepath": "icons/mclaren-light.9b3fac071ef779604eab.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/mclaren-light.9b3fac071ef779604eab.png"
        ],
    },
    "Mercedes-Benz": {
        "name": "Mercedes-Benz",
        "filename": "mercedes-benz.1f112a2808e13b02b2e5.png",
        "filepath": "icons/mercedes-benz.1f112a2808e13b02b2e5.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/mercedes-benz.1f112a2808e13b02b2e5.png"
        ],
    },
    "Mercury": {
        "name": "Mercury",
        "filename": "mercury.efb8307076a3038c17b2.png",
        "filepath": "icons/mercury.efb8307076a3038c17b2.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/mercury.efb8307076a3038c17b2.png"],
    },
    "MG": {
        "name": "MG",
        "filename": "mg-light.1dda134ee2d3c5fc9d0a.png",
        "filepath": "icons/mg-light.1dda134ee2d3c5fc9d0a.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/mg-light.1dda134ee2d3c5fc9d0a.png"
        ],
    },
    "MINI": {
        "name": "MINI",
        "filename": "mini-light.85e35036bcd1dea5ed2d.png",
        "filepath": "icons/mini-light.85e35036bcd1dea5ed2d.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/mini-light.85e35036bcd1dea5ed2d.png"
        ],
    },
    "Mitsubishi": {
        "name": "Mitsubishi",
        "filename": "mitsubishi.1b5e461d4945f0e126c6.png",
        "filepath": "icons/mitsubishi.1b5e461d4945f0e126c6.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/mitsubishi.1b5e461d4945f0e126c6.png"
        ],
    },
    "Mitsuoka": {
        "name": "Mitsuoka",
        "filename": "mitsuoka-light.f24798d2e961b6caabfa.png",
        "filepath": "icons/mitsuoka-light.f24798d2e961b6caabfa.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/mitsuoka-light.f24798d2e961b6caabfa.png"
        ],
    },
    "Morgan": {
        "name": "Morgan",
        "filename": "empty.gif",
        "filepath": "icons/empty.gif",
        "src": ["https://i.rdrom.ru/404/empty.gif"],
    },
    "Nio": {
        "name": "Nio",
        "filename": "nio-light.f8a426ed76504db0a846.png",
        "filepath": "icons/nio-light.f8a426ed76504db0a846.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/nio-light.f8a426ed76504db0a846.png"
        ],
    },
    "Nissan": {
        "name": "Nissan",
        "filename": "nissan-light.87a537dfa99f2ae3dd41.png",
        "filepath": "icons/nissan-light.87a537dfa99f2ae3dd41.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/nissan-light.87a537dfa99f2ae3dd41.png"
        ],
    },
    "Oldsmobile": {
        "name": "Oldsmobile",
        "filename": "oldsmobile.70a6857bb5aa35d38946.png",
        "filepath": "icons/oldsmobile.70a6857bb5aa35d38946.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/oldsmobile.70a6857bb5aa35d38946.png"
        ],
    },
    "OMODA": {
        "name": "OMODA",
        "filename": "omoda-light.0f5bde6f459024a7f1a9.png",
        "filepath": "icons/omoda-light.0f5bde6f459024a7f1a9.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/omoda-light.0f5bde6f459024a7f1a9.png"
        ],
    },
    "Opel": {
        "name": "Opel",
        "filename": "opel-light.80ef7b12e995c5775a7b.png",
        "filepath": "icons/opel-light.80ef7b12e995c5775a7b.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/opel-light.80ef7b12e995c5775a7b.png"
        ],
    },
    "ORA": {
        "name": "ORA",
        "filename": "ora-light.7f78d64cf7bf43445be7.png",
        "filepath": "icons/ora-light.7f78d64cf7bf43445be7.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/ora-light.7f78d64cf7bf43445be7.png"
        ],
    },
    "Oshan": {
        "name": "Oshan",
        "filename": "oshan.833170eaacc7507a3721.png",
        "filepath": "icons/oshan.833170eaacc7507a3721.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/oshan.833170eaacc7507a3721.png"],
    },
    "Oting": {
        "name": "Oting",
        "filename": "oting.4f9e7b3849023038183d.png",
        "filepath": "icons/oting.4f9e7b3849023038183d.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/oting.4f9e7b3849023038183d.png"],
    },
    "Packard": {
        "name": "Packard",
        "filename": "empty.gif",
        "filepath": "icons/empty.gif",
        "src": ["https://i.rdrom.ru/404/empty.gif"],
    },
    "Peugeot": {
        "name": "Peugeot",
        "filename": "peugeot.49726c1923bc4ae183c2.png",
        "filepath": "icons/peugeot.49726c1923bc4ae183c2.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/peugeot.49726c1923bc4ae183c2.png"],
    },
    "Plymouth": {
        "name": "Plymouth",
        "filename": "plymouth.5d2cfc8f966731f12fe2.png",
        "filepath": "icons/plymouth.5d2cfc8f966731f12fe2.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/plymouth.5d2cfc8f966731f12fe2.png"
        ],
    },
    "Polar Stone": {
        "name": "Polar Stone",
        "filename": "polar-stone-light.763e2897f1abfd372310.png",
        "filepath": "icons/polar-stone-light.763e2897f1abfd372310.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/polar-stone-light.763e2897f1abfd372310.png"
        ],
    },
    "Polestar": {
        "name": "Polestar",
        "filename": "polestar.9dfa31b7dd00ee5841e2.png",
        "filepath": "icons/polestar.9dfa31b7dd00ee5841e2.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/polestar.9dfa31b7dd00ee5841e2.png"
        ],
    },
    "Pontiac": {
        "name": "Pontiac",
        "filename": "pontiac-light.45f77a7e3694240368f2.png",
        "filepath": "icons/pontiac-light.45f77a7e3694240368f2.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/pontiac-light.45f77a7e3694240368f2.png"
        ],
    },
    "Porsche": {
        "name": "Porsche",
        "filename": "porsche.837851699bce718547eb.png",
        "filepath": "icons/porsche.837851699bce718547eb.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/porsche.837851699bce718547eb.png"],
    },
    "Proton": {
        "name": "Proton",
        "filename": "proton.63cbadb85067ead17d9f.png",
        "filepath": "icons/proton.63cbadb85067ead17d9f.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/proton.63cbadb85067ead17d9f.png"],
    },
    "RAM": {
        "name": "RAM",
        "filename": "ram.65a1de49c7011f845b9e.png",
        "filepath": "icons/ram.65a1de49c7011f845b9e.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/ram.65a1de49c7011f845b9e.png"],
    },
    "Ravon": {
        "name": "Ravon",
        "filename": "ravon.c78c508e05c706d6813c.png",
        "filepath": "icons/ravon.c78c508e05c706d6813c.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/ravon.c78c508e05c706d6813c.png"],
    },
    "Renault": {
        "name": "Renault",
        "filename": "renault-light.fc1350ea12945d160522.png",
        "filepath": "icons/renault-light.fc1350ea12945d160522.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/renault-light.fc1350ea12945d160522.png"
        ],
    },
    "Renault Samsung": {
        "name": "Renault Samsung",
        "filename": "renault-samsung.354c969758761a54ef7f.png",
        "filepath": "icons/renault-samsung.354c969758761a54ef7f.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/renault-samsung.354c969758761a54ef7f.png"
        ],
    },
    "Rising Auto": {
        "name": "Rising Auto",
        "filename": "rising-auto-light.8eabb9cb04f5ce0ec61e.png",
        "filepath": "icons/rising-auto-light.8eabb9cb04f5ce0ec61e.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/rising-auto-light.8eabb9cb04f5ce0ec61e.png"
        ],
    },
    "Rivian": {
        "name": "Rivian",
        "filename": "rivian-light.1e33085763cb84876123.png",
        "filepath": "icons/rivian-light.1e33085763cb84876123.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/rivian-light.1e33085763cb84876123.png"
        ],
    },
    "Roewe": {
        "name": "Roewe",
        "filename": "roewe-light.a4ad89aebe1ec053269c.png",
        "filepath": "icons/roewe-light.a4ad89aebe1ec053269c.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/roewe-light.a4ad89aebe1ec053269c.png"
        ],
    },
    "Rolls-Royce": {
        "name": "Rolls-Royce",
        "filename": "rolls-royce.4124cf05b283966ba591.png",
        "filepath": "icons/rolls-royce.4124cf05b283966ba591.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/rolls-royce.4124cf05b283966ba591.png"
        ],
    },
    "Rover": {
        "name": "Rover",
        "filename": "rover.0242a8005aab1318795d.png",
        "filepath": "icons/rover.0242a8005aab1318795d.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/rover.0242a8005aab1318795d.png"],
    },
    "Rox": {
        "name": "Rox",
        "filename": "rox-light.38f2f6f054770beec07c.png",
        "filepath": "icons/rox-light.38f2f6f054770beec07c.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/rox-light.38f2f6f054770beec07c.png"
        ],
    },
    "Saab": {
        "name": "Saab",
        "filename": "saab.b9e70719e9703b9690ca.png",
        "filepath": "icons/saab.b9e70719e9703b9690ca.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/saab.b9e70719e9703b9690ca.png"],
    },
    "SAIPA": {
        "name": "SAIPA",
        "filename": "saipa.bae813e7068ca0892daf.png",
        "filepath": "icons/saipa.bae813e7068ca0892daf.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/saipa.bae813e7068ca0892daf.png"],
    },
    "Saturn": {
        "name": "Saturn",
        "filename": "saturn.78ec4c763b3f460bc341.png",
        "filepath": "icons/saturn.78ec4c763b3f460bc341.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/saturn.78ec4c763b3f460bc341.png"],
    },
    "Scion": {
        "name": "Scion",
        "filename": "scion.cdd6a9c66110864c46dd.png",
        "filepath": "icons/scion.cdd6a9c66110864c46dd.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/scion.cdd6a9c66110864c46dd.png"],
    },
    "SEAT": {
        "name": "SEAT",
        "filename": "seat.053fe12e9f265ed4e08f.png",
        "filepath": "icons/seat.053fe12e9f265ed4e08f.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/seat.053fe12e9f265ed4e08f.png"],
    },
    "Seres": {
        "name": "Seres",
        "filename": "seres-light.8f2b3dc7ac04d3e2d433.png",
        "filepath": "icons/seres-light.8f2b3dc7ac04d3e2d433.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/seres-light.8f2b3dc7ac04d3e2d433.png"
        ],
    },
    "Shuanghuan": {
        "name": "Shuanghuan",
        "filename": "shuanghuan.13290dcbd72fecb162e2.png",
        "filepath": "icons/shuanghuan.13290dcbd72fecb162e2.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/shuanghuan.13290dcbd72fecb162e2.png"
        ],
    },
    "Skoda": {
        "name": "Skoda",
        "filename": "skoda.3518b191d9bf52eaf4b3.png",
        "filepath": "icons/skoda.3518b191d9bf52eaf4b3.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/skoda.3518b191d9bf52eaf4b3.png"],
    },
    "Skywell": {
        "name": "Skywell",
        "filename": "skywell.e68f45f5e3260a720a8b.png",
        "filepath": "icons/skywell.e68f45f5e3260a720a8b.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/skywell.e68f45f5e3260a720a8b.png"],
    },
    "Smart": {
        "name": "Smart",
        "filename": "smart.4d03be8710db79198594.png",
        "filepath": "icons/smart.4d03be8710db79198594.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/smart.4d03be8710db79198594.png"],
    },
    "Soueast": {
        "name": "Soueast",
        "filename": "soueast.a668a275dbf92fc736cb.png",
        "filepath": "icons/soueast.a668a275dbf92fc736cb.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/soueast.a668a275dbf92fc736cb.png"],
    },
    "SRM Shineray": {
        "name": "SRM Shineray",
        "filename": "shineray-light.3186220174d3ec4c90ac.png",
        "filepath": "icons/shineray-light.3186220174d3ec4c90ac.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/shineray-light.3186220174d3ec4c90ac.png",
            "https://c.rdrom.ru/js/bundles/media/shineray-dark.2e3c77e83444655742e9.png",
        ],
    },
    "SsangYong": {
        "name": "SsangYong",
        "filename": "ssangyong-light.990fef72e86f4b9006af.png",
        "filepath": "icons/ssangyong-light.990fef72e86f4b9006af.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/ssangyong-light.990fef72e86f4b9006af.png",
            "https://c.rdrom.ru/js/bundles/media/ssangyong-dark.a8df0bef2635f45ce0d2.png",
        ],
    },
    "Subaru": {
        "name": "Subaru",
        "filename": "subaru.f35c710433d25ec3b19d.png",
        "filepath": "icons/subaru.f35c710433d25ec3b19d.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/subaru.f35c710433d25ec3b19d.png"],
    },
    "Suzuki": {
        "name": "Suzuki",
        "filename": "suzuki.3f38e7beb78986325fb6.png",
        "filepath": "icons/suzuki.3f38e7beb78986325fb6.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/suzuki.3f38e7beb78986325fb6.png"],
    },
    "SWM": {
        "name": "SWM",
        "filename": "swm.4dfac8cc082e98a91df6.png",
        "filepath": "icons/swm.4dfac8cc082e98a91df6.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/swm.4dfac8cc082e98a91df6.png"],
    },
    "Tank": {
        "name": "Tank",
        "filename": "tank-light.55fd200e8230d0de2fc3.png",
        "filepath": "icons/tank-light.55fd200e8230d0de2fc3.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/tank-light.55fd200e8230d0de2fc3.png",
            "https://c.rdrom.ru/js/bundles/media/tank-dark.3e01d21bb1cc13beadcb.png",
        ],
    },
    "TATA": {
        "name": "TATA",
        "filename": "tata.6b6438c37ddc71caafb7.png",
        "filepath": "icons/tata.6b6438c37ddc71caafb7.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/tata.6b6438c37ddc71caafb7.png"],
    },
    "Tatra": {
        "name": "Tatra",
        "filename": "empty.gif",
        "filepath": "icons/empty.gif",
        "src": ["https://i.rdrom.ru/404/empty.gif"],
    },
    "Tesla": {
        "name": "Tesla",
        "filename": "tesla.2c7d526d2d5ef2f10817.png",
        "filepath": "icons/tesla.2c7d526d2d5ef2f10817.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/tesla.2c7d526d2d5ef2f10817.png"],
    },
    "Tianma": {
        "name": "Tianma",
        "filename": "tianma.74ddd87473ecb3949fc2.png",
        "filepath": "icons/tianma.74ddd87473ecb3949fc2.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/tianma.74ddd87473ecb3949fc2.png"],
    },
    "Tianye": {
        "name": "Tianye",
        "filename": "tianye.8698dde57951dce1f446.png",
        "filepath": "icons/tianye.8698dde57951dce1f446.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/tianye.8698dde57951dce1f446.png"],
    },
    "Toyota": {
        "name": "Toyota",
        "filename": "toyota-light.e5d2efbc0fe39b43fa43.png",
        "filepath": "icons/toyota-light.e5d2efbc0fe39b43fa43.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/toyota-light.e5d2efbc0fe39b43fa43.png",
            "https://c.rdrom.ru/js/bundles/media/toyota-dark.7fa5678b8f28250f0511.png",
        ],
    },
    "Trabant": {
        "name": "Trabant",
        "filename": "trabant-light.819a1b6391c1180ad4c5.png",
        "filepath": "icons/trabant-light.819a1b6391c1180ad4c5.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/trabant-light.819a1b6391c1180ad4c5.png",
            "https://c.rdrom.ru/js/bundles/media/trabant-dark.2c91ca0627ad31be5c44.png",
        ],
    },
    "Vauxhall": {
        "name": "Vauxhall",
        "filename": "empty.gif",
        "filepath": "icons/empty.gif",
        "src": ["https://i.rdrom.ru/404/empty.gif"],
    },
    "Venucia": {
        "name": "Venucia",
        "filename": "venucia.770d3369af7d4523144f.png",
        "filepath": "icons/venucia.770d3369af7d4523144f.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/venucia.770d3369af7d4523144f.png"],
    },
    "VGV": {
        "name": "VGV",
        "filename": "vgv-light.5b244a122ac6588ec64a.png",
        "filepath": "icons/vgv-light.5b244a122ac6588ec64a.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/vgv-light.5b244a122ac6588ec64a.png",
            "https://c.rdrom.ru/js/bundles/media/vgv-dark.e4053bbafd7a2396370e.png",
        ],
    },
    "Volkswagen": {
        "name": "Volkswagen",
        "filename": "volkswagen-light.0018f014092337ece455.png",
        "filepath": "icons/volkswagen-light.0018f014092337ece455.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/volkswagen-light.0018f014092337ece455.png",
            "https://c.rdrom.ru/js/bundles/media/volkswagen-dark.9d94c4c2de4e0cd12877.png",
        ],
    },
    "Volvo": {
        "name": "Volvo",
        "filename": "volvo-light.58f0499e635b34b46e28.png",
        "filepath": "icons/volvo-light.58f0499e635b34b46e28.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/volvo-light.58f0499e635b34b46e28.png",
            "https://c.rdrom.ru/js/bundles/media/volvo-dark.26d51ec75ecadf47f9a2.png",
        ],
    },
    "Vortex": {
        "name": "Vortex",
        "filename": "vortex-light.f8440bc69c6fb72e8045.png",
        "filepath": "icons/vortex-light.f8440bc69c6fb72e8045.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/vortex-light.f8440bc69c6fb72e8045.png",
            "https://c.rdrom.ru/js/bundles/media/vortex-dark.32f46dfa096a22eb1d47.png",
        ],
    },
    "Voyah": {
        "name": "Voyah",
        "filename": "voyah-light.ae7405c9662b6d90f707.png",
        "filepath": "icons/voyah-light.ae7405c9662b6d90f707.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/voyah-light.ae7405c9662b6d90f707.png",
            "https://c.rdrom.ru/js/bundles/media/voyah-dark.a34c16bb3bec1d31c8fd.png",
        ],
    },
    "Wartburg": {
        "name": "Wartburg",
        "filename": "wartburg.4620071b48b3470583cb.png",
        "filepath": "icons/wartburg.4620071b48b3470583cb.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/wartburg.4620071b48b3470583cb.png"
        ],
    },
    "Weltmeister": {
        "name": "Weltmeister",
        "filename": "weltmeister-light.eadfb07608d43ab185b8.png",
        "filepath": "icons/weltmeister-light.eadfb07608d43ab185b8.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/weltmeister-light.eadfb07608d43ab185b8.png",
            "https://c.rdrom.ru/js/bundles/media/weltmeister-dark.161d1bd3f45f4a15d4f1.png",
        ],
    },
    "WEY": {
        "name": "WEY",
        "filename": "wey.0149037cfc26aa1e121c.png",
        "filepath": "icons/wey.0149037cfc26aa1e121c.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/wey.0149037cfc26aa1e121c.png"],
    },
    "Wuling": {
        "name": "Wuling",
        "filename": "wuling.a3ba45a05183550b8946.png",
        "filepath": "icons/wuling.a3ba45a05183550b8946.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/wuling.a3ba45a05183550b8946.png"],
    },
    "Xiaomi": {
        "name": "Xiaomi",
        "filename": "xiaomi.04324c783c24573ccec9.png",
        "filepath": "icons/xiaomi.04324c783c24573ccec9.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/xiaomi.04324c783c24573ccec9.png"],
    },
    "Xin Kai": {
        "name": "Xin Kai",
        "filename": "xin-kai-light.ee20ab8cc69ed989636d.png",
        "filepath": "icons/xin-kai-light.ee20ab8cc69ed989636d.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/xin-kai-light.ee20ab8cc69ed989636d.png",
            "https://c.rdrom.ru/js/bundles/media/xin-kai-dark.0a9782d4c5bb5ea1c0bf.png",
        ],
    },
    "Xpeng": {
        "name": "Xpeng",
        "filename": "xpeng-light.cbfca67115294b2c794f.png",
        "filepath": "icons/xpeng-light.cbfca67115294b2c794f.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/xpeng-light.cbfca67115294b2c794f.png",
            "https://c.rdrom.ru/js/bundles/media/xpeng-dark.73cb7130a74729d4799a.png",
        ],
    },
    "Yema": {
        "name": "Yema",
        "filename": "yema.7f5369eb4ce6f4d090bd.png",
        "filepath": "icons/yema.7f5369eb4ce6f4d090bd.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/yema.7f5369eb4ce6f4d090bd.png"],
    },
    "Zeekr": {
        "name": "Zeekr",
        "filename": "zeekr-light.bc11ef25634e702ce7a2.png",
        "filepath": "icons/zeekr-light.bc11ef25634e702ce7a2.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/zeekr-light.bc11ef25634e702ce7a2.png",
            "https://c.rdrom.ru/js/bundles/media/zeekr-dark.fdd3991178b755c1db93.png",
        ],
    },
    "Zotye": {
        "name": "Zotye",
        "filename": "zotye.fb9a2744758c17f615da.png",
        "filepath": "icons/zotye.fb9a2744758c17f615da.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/zotye.fb9a2744758c17f615da.png"],
    },
    "ZX": {
        "name": "ZX",
        "filename": "zx.3abd4f5b2840ce55386b.png",
        "filepath": "icons/zx.3abd4f5b2840ce55386b.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/zx.3abd4f5b2840ce55386b.png"],
    },
    "Marussia": {
        "name": "Marussia",
        "filename": "marussia.89782e4879f5412b8634.png",
        "filepath": "icons/marussia.89782e4879f5412b8634.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/marussia.89782e4879f5412b8634.png"
        ],
    },
    "Solaris": {
        "name": "Solaris",
        "filename": "solaris-light.76f5e3724b6c54dab22e.png",
        "filepath": "icons/solaris-light.76f5e3724b6c54dab22e.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/solaris-light.76f5e3724b6c54dab22e.png",
            "https://c.rdrom.ru/js/bundles/media/solaris-dark.c0ae2aad033e1481ca52.png",
        ],
    },
    "Tenet": {
        "name": "Tenet",
        "filename": "empty.gif",
        "filepath": "icons/empty.gif",
        "src": ["https://i.rdrom.ru/404/empty.gif"],
    },
    "Xcite": {
        "name": "Xcite",
        "filename": "xcite-light.532026594450bcbb0d82.png",
        "filepath": "icons/xcite-light.532026594450bcbb0d82.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/xcite-light.532026594450bcbb0d82.png",
            "https://c.rdrom.ru/js/bundles/media/xcite-dark.245921a01617bda2e2f3.png",
        ],
    },
    "Амберавто": {
        "name": "Амберавто",
        "filename": "amberauto-light.2121ae9f99de754f9e35.png",
        "filepath": "icons/amberauto-light.2121ae9f99de754f9e35.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/amberauto-light.2121ae9f99de754f9e35.png",
            "https://c.rdrom.ru/js/bundles/media/amberauto-dark.d4e0e1c2bbebd8b39c66.png",
        ],
    },
    "Амбертрак": {
        "name": "Амбертрак",
        "filename": "ambertruck.42dfcff058b89a85da94.png",
        "filepath": "icons/ambertruck.42dfcff058b89a85da94.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/ambertruck.42dfcff058b89a85da94.png"
        ],
    },
    "Аурус": {
        "name": "Аурус",
        "filename": "aurus.e527b9758750f77617d1.png",
        "filepath": "icons/aurus.e527b9758750f77617d1.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/aurus.e527b9758750f77617d1.png"],
    },
    "Богдан": {
        "name": "Богдан",
        "filename": "bogdan.f15f7c6de2ce0d8d9aa0.png",
        "filepath": "icons/bogdan.f15f7c6de2ce0d8d9aa0.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/bogdan.f15f7c6de2ce0d8d9aa0.png"],
    },
    "Волга": {
        "name": "Волга",
        "filename": "volga.ecb7b116b008afc36c90.png",
        "filepath": "icons/volga.ecb7b116b008afc36c90.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/volga.ecb7b116b008afc36c90.png"],
    },
    "ГАЗ": {
        "name": "ГАЗ",
        "filename": "gaz.c43dcf358f8041811cc8.png",
        "filepath": "icons/gaz.c43dcf358f8041811cc8.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/gaz.c43dcf358f8041811cc8.png"],
    },
    "Донинвест": {
        "name": "Донинвест",
        "filename": "doninvest.3d3a53a4401ed7ac75a2.png",
        "filepath": "icons/doninvest.3d3a53a4401ed7ac75a2.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/doninvest.3d3a53a4401ed7ac75a2.png"
        ],
    },
    "ЗАЗ": {
        "name": "ЗАЗ",
        "filename": "zaz.991e462e769e7a1700c9.png",
        "filepath": "icons/zaz.991e462e769e7a1700c9.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/zaz.991e462e769e7a1700c9.png"],
    },
    "ЗИЛ": {
        "name": "ЗИЛ",
        "filename": "zil-light.5b33e38e66c701c671e8.png",
        "filepath": "icons/zil-light.5b33e38e66c701c671e8.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/zil-light.5b33e38e66c701c671e8.png",
            "https://c.rdrom.ru/js/bundles/media/zil-dark.d4552f8413136079ba55.png",
        ],
    },
    "ЗиС": {
        "name": "ЗиС",
        "filename": "zis-light.8606cd0ef9b9cb5f7b75.png",
        "filepath": "icons/zis-light.8606cd0ef9b9cb5f7b75.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/zis-light.8606cd0ef9b9cb5f7b75.png",
            "https://c.rdrom.ru/js/bundles/media/zis-dark.fca60c8f2e9079a290a7.png",
        ],
    },
    "ИЖ": {
        "name": "ИЖ",
        "filename": "izh.39802ff74d2c4f90788c.png",
        "filepath": "icons/izh.39802ff74d2c4f90788c.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/izh.39802ff74d2c4f90788c.png"],
    },
    "Лада": {
        "name": "Лада",
        "filename": "lada.d7b303a0cddaf20da89a.png",
        "filepath": "icons/lada.d7b303a0cddaf20da89a.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/lada.d7b303a0cddaf20da89a.png"],
    },
    "ЛуАЗ": {
        "name": "ЛуАЗ",
        "filename": "luaz.d90404dc3d92c77f82fe.png",
        "filepath": "icons/luaz.d90404dc3d92c77f82fe.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/luaz.d90404dc3d92c77f82fe.png"],
    },
    "Москвич": {
        "name": "Москвич",
        "filename": "moskvich.20f208e2630fd0bfda13.png",
        "filepath": "icons/moskvich.20f208e2630fd0bfda13.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/moskvich.20f208e2630fd0bfda13.png"
        ],
    },
    "Соллерс": {
        "name": "Соллерс",
        "filename": "sollers.153643db1f470e164dd5.png",
        "filepath": "icons/sollers.153643db1f470e164dd5.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/sollers.153643db1f470e164dd5.png"],
    },
    "ТагАЗ": {
        "name": "ТагАЗ",
        "filename": "tagaz.8c30bc06d060e30048ed.png",
        "filepath": "icons/tagaz.8c30bc06d060e30048ed.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/tagaz.8c30bc06d060e30048ed.png"],
    },
    "УАЗ": {
        "name": "УАЗ",
        "filename": "uaz.07ccd1ec4662413d5788.png",
        "filepath": "icons/uaz.07ccd1ec4662413d5788.png",
        "src": ["https://c.rdrom.ru/js/bundles/media/uaz.07ccd1ec4662413d5788.png"],
    },
    "Эволют": {
        "name": "Эволют",
        "filename": "evolute-light.cff4e9f73731f3e6fd9f.png",
        "filepath": "icons/evolute-light.cff4e9f73731f3e6fd9f.png",
        "src": [
            "https://c.rdrom.ru/js/bundles/media/evolute-light.cff4e9f73731f3e6fd9f.png",
            "https://c.rdrom.ru/js/bundles/media/evolute-dark.d823f1b0b859418e7e19.png",
        ],
    },
}
print(json.dumps(list(a.values()), ensure_ascii=False))
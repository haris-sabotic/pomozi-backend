import prisma from "../src/util/db";

const runSeeders = async () => {
    await prisma.action.create({
        data:
        {
            name: "Srcem za Crnu Goru! - Humanost",
            description: "Akcija Srcem za Crnu Goru pokrenuta je sa ciljem da se okupe svi ljudi velikog srca kako bi se priključili akciji koja će ujediniti Crnu Goru i dijasporu.",
            photo: "action_1.png"
        },
    });
    await prisma.action.create({
        data:
        {
            name: "Pomoć za Palestinu - Pomozi.ba",
            description: "Pokrećemo apel za Palestinu i molimo vas posebno ovaj put da u što većem broju dijelimo apel iz razloga što je vidljivost informacija o Palestini na društvenim mrežama smanjena na minimum.",
            photo: "action_2.png"
        },
    });
    await prisma.action.create({
        data:
        {
            name: "Pomozimo bračnom... - Humanost",
            description: "Miodrag i Slavica Bulatović su bračni par iz Podogorice koji, uprkos teškim životnim izazovima, ponosno ističu veliku ljubav koja ispunjava njihov dom. Slavica je 2018. godine doživjela moždani udar, a poslije operacije...",
            photo: "action_3.png"
        },
    });
    //
    await prisma.organization.create({
        data: {
            name: "Crveni krst",
            donated_to_name: "CRVENOM KRSTU",
            description: "Crveni krst Crne Gore je jedinstvena, nezavisna i dobrovoljna humanitarna organizacija koja djeluje na teritoriji Crne Gore, kao jedino priznato nacionalno društvo Crvenog krsta u državi.",
            url: "https://ckcg.me/",
            photo: "crveni_krst.png",
            featured_photo: "crveni_krst_featured.png",
            lat: "42.44341820074499",
            lng: "19.256125218420586"
        }
    });
    await prisma.organization.create({
        data: {
            name: "Budi human",
            donated_to_name: "Organizaciji BUDI HUMAN",
            description: "...",
            url: "http://www.budihuman.rs",
            photo: "budi_human.png",
            featured_photo: "budi_human_featured.png",
            lat: "44.81270747387252",
            lng: "20.411759167639676"
        }
    });
    await prisma.organization.create({
        data: {
            name: "Humanost",
            donated_to_name: "Organizaciji HUMANOST",
            description: "...",
            url: "https://www.fondacija.rs",
            photo: "humanost.png",
            featured_photo: "humanost_featured.png",
            lat: "44.78532816871793",
            lng: "20.46316491149266"
        }
    });
    await prisma.organization.create({
        data: {
            name: "Pomozi.ba",
            donated_to_name: "Organizaciji POMOZI.BA",
            description: "...",
            url: "https://pomoziba.org/",
            photo: "pomozi_ba.png",
            featured_photo: null,
            lat: "43.852447759774314",
            lng: "18.36880864931537"
        }
    });
    await prisma.organization.create({
        data: {
            name: "Pomoc deci",
            donated_to_name: "Organizaciji POMOC DECI",
            description: "...",
            url: "https://www.pomocdeci.org/",
            photo: "pomoc_deci.png",
            featured_photo: null,
            lat: "44.812926307248944",
            lng: "20.461441311823084"
        }
    });
    //
    await prisma.reward.create({
        data: {
            name: "Cineplexx popust",
            description: "50% popusta na filmove",
            photo: "cineplexx.jpg",
            price: 400
        }
    });
    await prisma.reward.create({
        data: {
            name: "Zara popust",
            description: "30% popusta na sve artikle",
            photo: "zara.jpg",
            price: 550
        }
    });
    await prisma.reward.create({
        data: {
            name: "Burger King popust",
            description: "10% popusta na sve burgere",
            photo: "burger_king.jpg",
            price: 300
        }
    });
    await prisma.reward.create({
        data: {
            name: "Goodfellas popust",
            description: "45% popusta na sve pizze",
            photo: "goodfellas.jpg",
            price: 300
        }
    });
};
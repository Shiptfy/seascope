import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {DialogBoardComponent} from "./dialog-board/dialog-board.component";

export interface IServices {
  iconPath?: string;
  name?: string;
  backgroundImagePath?: string;
  backgroundColor?: string;
  image?: string;
  description?: string;
  descriptionTitle?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatDialogModule, CarouselModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'seascope';
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    touchDrag: false,
    lazyLoad: true,
    animateIn: true,
    pullDrag: false,
    dots: true,
    margin: 10,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  protected readonly featuresTitle: string[] = [
    "Innovation",
    "Approach"
  ];
  protected readonly featuresDescription: string[] = [
    "We stay at the forefront of industry trends and leverage cutting-edge tools and techniques to stay ahead of the competition. <b>Client-Centric</b>",
    "Your success is our priority. We work closely with you to understand your unique challenges and develop customized solutions."
  ]
  protected readonly servicesTitle: string[] = [
    "PR Strategy development",
    "Business Excellence",
    "crisis management",
    "reputation & strategic positioning",
    "market analysis and research",
    "Strategic Planning and execution",
    "Training and development",
    "Image",
    "Business performance measurement",
    "Sustainability and energy transition",
    "Image"
  ]
  protected readonly servicesDescription: { title: string, description?: string }[] = [
    {
      title: "Reinforcing Waves of Influence",
      description: "Effective public relations is more than just sending out press releases. It's about creating waves of influence that ripple throughout the maritime industry. With our PR Strategy Development service, we develop a tailored media outreach plan that positions you as an industry leader and generates buzz. From securing media coverage in leading maritime publications to facilitating thought leadership opportunities, we ensure your message reaches the right audiences, amplifying your influence and elevating your brand's reputation.\n"
    },
    {
      title: "Unleashing Your Maritime Potential",
      description: "We dive deep into the intricacies of your operations, identifying areas for improvement, and developing tailored strategies to elevate your performance. The power of connections cannot be underestimated in the maritime industry. Our dedicated team specializes in forging strategic alliances and creating valuable networking opportunities for your business. We facilitate introductions, organize industry-specific events, and leverage our extensive network to connect you with key stakeholders, decision-makers, and industry influencers. Together, we navigate the waters of collaboration, fostering partnerships that open new horizons and drive mutual success.\n"
    },
    {
      title: "Swift and Strategic Response",
      description: "When a crisis hits, time is of the essence. Our Maritime Crisis Management service equips you with a well-defined crisis response plan tailored to your specific needs. We provide real-time monitoring, rapid assessment, and clear communication protocols to ensure a swift and strategic response. Our team stands by your side, offering expert guidance and support throughout the crisis, helping you navigate the complexities and minimize the impact on your operations and reputation.\n"
    },
    {
      title: "Mapping Your Brand's Voyage",
      description: "At SeaScope, we understand that every brand has a unique story to tell. Our Reputation and Strategic Positioning service begins with a deep dive into your business, market, and target audience. We analyze your brand's DNA, uncovering its core values, strengths, and differentiators. With this knowledge, we create a strategic roadmap that charts the course for your brand's voyage, ensuring that every step aligns with your overarching vision and goals.\n"

    },
    {
      title: "Data-driven Decision Making",
      description: "In the maritime industry, data is a valuable asset. Our Market Analysis and Technical Research service empowers you to make data-driven decisions. We gather, analyze, and interpret market and technical data to provide you with actionable insights. Whether you need to evaluate investment opportunities, assess market entry strategies, or optimize your operational efficiency, our research equips you with the knowledge required to make informed choices that drive success.\n"
    },
    {
      title: "Setting Sail with a Clear Vision",
      description: "At SeaScope, we believe that strategic planning begins with a clear vision. Our experts work closely with you to understand your business goals, aspirations, and unique challenges. We analyze market dynamics, industry trends, and competitive landscapes to gain comprehensive insights. With this knowledge, we collaboratively develop a strategic framework that aligns your vision with actionable goals and milestones, setting the course for your maritime success.\n"
    },
    {
      title: "Enhancing Knowledge and Expertise",
      description: "At SeaScope, we understand that knowledge is power. Our Maritime Training and Development service offers a wide range of tailored training programs designed to enhance the knowledge and expertise of maritime professionals. Whether it's ship management, chartering, or maritime law, our training programs are delivered by industry experts and designed to meet your specific needs. We also offer a range of soft skills training programs, including leadership, communication, and team building, to help you build a high-performance team that drives your business forward.\n"
    },
    {
      title: "Image",
    },
    {
      title: "Holistic Performance Evaluation",
      description: "At SeaScope, we believe that true success is measured by more than just the bottom line. Our Business Performance Measurement service offers a holistic approach to performance evaluation, taking into account financial, operational, and reputational factors. We analyze your business from every angle, identifying areas for improvement and developing tailored strategies to elevate your performance. We also offer a range of soft skills training programs, including leadership, communication, and team building, to help you build a high-performance team that drives your business forward.\n"

    },
    {
      title: "Sustainability and Energy Transition",
      description: "At SeaScope, we believe that true success is measured by more than just the bottom line. Our Business Performance Measurement service offers a holistic approach to performance evaluation, taking into account financial, operational, and reputational factors. We analyze your business from every angle, identifying areas for improvement and developing tailored strategies to elevate your performance. We also offer a range of soft skills training programs, including leadership, communication, and team building, to help you build a high-performance team that drives your business forward.\n"
    },
    {
      title: "Image",
    }
  ]
  protected readonly services: IServices[] = [];
  protected readonly features: IServices[] = [];

  constructor(private readonly _dialog: MatDialog) {
  }

  asset(png: string) {
    return `assets/${png}`;
  }


  ngOnInit(): void {
    this.generateServices();
    this.generateFeatures()
    if (this.video) this.video.nativeElement.play();
  }

  private generateServices() {
    let imageCount = 1
    for (let i = 1; i < this.servicesTitle.length + 1; i++) {
      if (this.servicesTitle[i - 1] === "Image") {
        this.services.push({
          image: `assets/images/image-${imageCount}.png`,
        })
        imageCount++
        continue
      }
      this.services.push({
        iconPath: `assets/icons/icon-${i}.png`,
        name: this.servicesTitle[i - 1],
        backgroundImagePath: `assets/images/img-${i}.jpg`,
        backgroundColor: i === this.servicesTitle.length - 1 ? "rgba(29,147,39,0.8)" : i % 2 === 0 ? "rgba(25,47,72,0.8)" : "rgba(146,91,58,0.8)",
        descriptionTitle: this.servicesDescription[i - 1]["title"],
        description: this.servicesDescription[i - 1]["description"]
      })
    }
  }

  private generateFeatures() {
    let imageCount = 1
    for (let i = 1; i < this.featuresTitle.length + 1; i++) {
      if (this.featuresTitle[i - 1] === "Image") {
        this.features.push({
          image: `assets/images/feature-${i}.jpg`,
        })
        imageCount++
        continue
      }
      this.features.push({
        iconPath: `assets/icons/icon-${i}.png`,
        name: this.featuresTitle[i - 1],
        backgroundImagePath: `assets/images/feature-${i}.jpg`,
        backgroundColor: i === this.featuresTitle.length - 1 ? "rgba(25,47,72,0.8)" : "rgba(146,91,58,0.8)",
        descriptionTitle: this.featuresTitle[i - 1],
        description: this.featuresDescription[i - 1]
      })
    }
  }

  openModal(service: IServices) {
    this._dialog.open(DialogComponent, {
      data: service,
    })
  }

  private readonly boards: string[] = [
    "Eng. Ahmed Sharaf is a highly talented and accomplished professional in fields of information technology,\n" +
    "education, business excellence and communications, known for his exceptional business skills and\n" +
    "networking abilities. Currently serving as the CEO of Academy Company for Information & Communication\n" +
    "Technology, he has made significant contributions to the growth and success of the organization.\n" +
    "With an extensive background in the industry, Ahmed has honed his business acumen through years of\n" +
    "experience and a deep understanding of market dynamics. His exceptional strategic thinking and analytical\n" +
    "skills have enabled him to identify lucrative business opportunities, develop innovative solutions, and forge\n" +
    "successful partnerships that drive growth and profitability.\n" +
    "Ahmed's networking abilities are noteworthy, as he possesses a natural talent for building and nurturing\n" +
    "valuable professional relationships. He leverages his extensive network of industry contacts to forge strategic\n" +
    "alliances, establish collaborative partnerships, and foster mutually beneficial connections. His ability to\n" +
    "connect with influential stakeholders and decision-makers has been instrumental in securing key business\n" +
    "opportunities and expanding the organization's reach and impact.\n" +
    "In addition to his business skills, Ahmed is highly regarded for his exceptional leadership abilities. He\n" +
    "possesses a strong vision and the ability to inspire and motivate teams to achieve ambitious goals. His\n" +
    "effective communication skills and collaborative approach foster a positive work culture that encourages\n" +
    "creativity, innovation, and high performance.\n" +
    "Ahmed's exceptional business intelligence and creativity are key factors in his ability to drive innovation\n" +
    "within the organization. He possesses a deep understanding of emerging technologies and industry trends,\n" +
    "allowing him to identify opportunities for leveraging technology to gain a competitive edge. His innovative\n" +
    "thinking and ability to think outside the box have led to the implementation of groundbreaking initiatives that\n" +
    "have propelled the organization's success.\n" +
    "Beyond his professional achievements, Ahmed is actively engaged in various industry organizations and\n" +
    "events. He participates in conferences, seminars, and workshops, where he shares his expertise, stays\n" +
    "informed about the latest industry developments, and expands his professional network. His involvement\n" +
    "in these activities demonstrates his commitment to continuous learning and staying at the forefront of the\n" +
    "industry.\n" +
    "In summary, Eng. Ahmed Sharaf is a highly accomplished"
    ,
    "Captain Rami is a highly accomplished maritime professional, possessing a Class I Certificate of Competency as a Master Mariner and over 11 years of experience, with a career split between MISC LNG tankers and the UAE's ADNOC L&S OSVs. His journey took a fascinating turn when he explored roles within ADIB's Business Banking Division and Real Estate Investment Finance, honing valuable skills.\n" +
    "\n" +
    " \n" +
    "\n" +
    "In 2019, Captain Rami capitalized on this expertise to establish and manage ZMS Ship Management and Operations in Dubai, UAE. Under his leadership, ZMS has emerged as a versatile player in the maritime industry, offering diverse services that include chartering and SNP brokerage, arbitrage, meticulous vessel inspections, and efficient port management.\n" +
    "\n" +
    " \n" +
    "\n" +
    "In 2022, Captain Rami co-founded NEONAUTICA, a groundbreaking technology incubator hub that focuses on innovative technological advancements, particularly in the clean energy & leisure marine sectors. As he assumed the position of CEO, Capt. Rami is leading NEONAUTICA to be pledged to spearheading the maritime sector's transition towards decarbonization and sustainable practices, positioning itself as a leader in this transformative journey.\n" +
    "\n" +
    " \n" +
    "\n" +
    "Furthermore, Captain Rami holds the position of Chairman at YoungShip UAE, a prominent chapter of the global YoungShip network, dedicated to supporting and empowering young professionals in the maritime industry within the UAE. In this role, he actively contributes to the development of young talents within the UAE's maritime sector, fostering networking, knowledge sharing, and professional growth. As the sole NGO representative on the UAE National Maritime Team under the UAE's MOEI, Captain Rami underscores the organization's commitment to collaboration and sustainability in the maritime domain.\n" +
    "\n" +
    " \n" +
    "\n" +
    "With his multifaceted expertise, Captain Rami is a formidable presence in the maritime industry, consistently advocating for innovation and sustainability at every juncture",
    "Fazel A. Fazelbhoy\n" +
    "\n" +
    "\n" +
    "Currently CEO of Synergy Offshore, a Dubai based energy consultancy firm, Fazel was previously the CEO of Topaz Energy and Marine. Fazel has more than 30 years of experience in the Oil Field Services, Marine and the Energy sectors in multicultural and dynamic organizations and is a Senior Advisor to the Westwood Global Energy Group for the Middle East. He has a proven track record of leadership and entrepreneurial growth, with a “hands-on” approach to team building and operations that spanned the Middle East, Azerbaijan, Kazakhstan, Brazil and West Africa. His significant exposure to M&A, turnarounds, business restructures, start-ups and the development of new markets in frontier territories allows him to provide a high caliber consultancy service to both trade and the financial sector that needs an in-depth industry perspective.\n",
    "Jasmin is a dual qualified English and German Solicitor and has been specializing in marine insurance law since the start of her career in 1997. She studied law in Hamburg and maritime law in Southampton and gained valuable experience in international law firms in Hamburg and London in the respective marine insurance departments.\n" +
    "\n" +
    "After three years of working in the city of London, she moved to Dubai in 2002 and joined a leading marine insurance broker as legal counsel for the Middle East. She established an excellent network within the maritime community and developed her legal skills further by handling marine insurance claims, from salvage, collisions, wreck removal to cargo claims and personal injury. This gained her the reputation as one of the most experienced marine insurance experts in the region who has been ranked in Legal 500 and Chambers Global consistently as a leading expert.\n" +
    "\n" +
    "In 2005 Jasmin established Fichte & Co LLC, one of the leading law firms in the Middle East, with the support of the shipping community. The company has since grown to one of the largest full-service law firms and represents not only ship owners, P&I clubs, insurers and re-insurers, trading houses but also numerous clients from a variety of sectors and industries. She publishes frequent articles on diverse subjects of marine insurance, shipping, and transportation law and regularly works closely with the UAE Federal Transport Authority and the Dubai Government.\n",
    "Danial Kaabi is the  CEO of  Sea Horizon Offshore Marine Services, a company committed to servicing multinational companies and delivering excellence of services globally. Coming from a family with long-standing success within the sector, Danial has strong foundations and a deep understanding of numerous aspects of maritime and offshore operations and has been featured in industry publications as an expert in his field. \n" +
    "\n" +
    "Having studied Global Business at the Harvard Business School and Economics and Business Management at York and Ryerson University respectively, Danial has been leading the third-generation family business from a very young age with great success, growing its’ international outreach. He is a firm believer of building and sustaining firm, family-like relationships with clients and business partners, while with entrepreneurism at his core, Danial is the founder and sits on the board of KBL Smart Solutions Commodity Trading and Forte Global International.\n" +
    "\n" +
    "Passionate about youth empowerment, Danial is an active member of YoungShip UAE, an non-profit organisation which aims at empowering the youth in maritime, as he very much enjoys inspiring and supporting the new generation entering the industry at every given opportunity. \n",
    "Mohamed Ajjan is a distinguished maritime professional with a remarkable career spanning over two decades in offshore oil field operations and logistics support. As the Fleet Manager OSV at Zakher Marine International, he brings a wealth of experience and expertise to his role, ensuring the success of marine operations under his purview.\n" +
    "\n" +
    "Career Highlights:\n" +
    "\n" +
    "Throughout his career, Mohamed has consistently demonstrated his ability to lead marine operations, drive commercial initiatives, and oversee complex technical projects in senior management capacities. His track record speaks volumes about his proven leadership and coaching skills, underscored by a strong foundation in sound business principles and an unwavering drive for achieving exceptional results.\n" +
    "\n" +
    "A Master Mariner's Legacy:\n" +
    "\n" +
    "As a Master Mariner, Mohamed Ajjan possesses the highest level of competence and knowledge in maritime affairs. His extensive 22-year journey in offshore oil field operations has seen him navigate a diverse fleet of vessels, including Dynamic Positioning (DP) Offshore Supply Vessels (OSV), Diving Support Vessels (DSV), Anchor Handling Tug Supply (AHTS) vessels, Tug & Barges, Lift boats, Drilling Jack-Up rigs, and more. His expertise also extends to conducting Site-Specific Analysis for Jack-Up positioning and managing Pipe Lay and Crane Barges in conjunction with AHTS vessels, all crucial components of offshore construction projects.\n" +
    "\n" +
    "Consulting Excellence:\n" +
    "\n" +
    "In addition to his operational roles, Mohamed has served as a trusted Marine Consultant for various entities, providing invaluable guidance in the development of Operations Manuals and Company Policies & Procedures. His contributions in this capacity have consistently ensured compliance with industry regulations and the implementation of best practices, further enhancing the safety and efficiency of marine operations.\n" +
    "\n" +
    "A Seafarer's Foundation:\n" +
    "\n" +
    "Mohamed's maritime journey commenced with a decade of hands-on experience onboard different types of merchant vessels, including Bulk carriers, Container ships, and General cargo vessels. This extensive seafaring experience has afforded him a deep understanding of vessel operations, navigation, and effective crew management, enriching his holistic approach to maritime leadership.\n" +
    "\n" +
    "Vision for the Future:\n" +
    "\n" +
    "As Fleet Manager OSV at Zakher Marine International, Mohamed Ajjan continues to steer marine operations toward excellence. His unyielding commitment to innovation, safety, and operational excellence makes him a revered figure in the maritime community. Mohamed's leadership remains instrumental in the success of both his organization and the broader offshore oil and gas industry.",
    "A marine engineer and degree in engineering by background, the ALBWARDY DAMEN Managing Director has had a varied career including spells working for shipping lines, at power plants. The majority of his career he spend with tug and off shore company Svitzer. Clearly as happy in coveralls and a hard hat as he is in a tailored suit. He has been 12 years in the UAE and the Dane took over the helm at ALBWARDY DAMEN Dubai in January 2013.",
    "Karim Hasab El-Nabi is a prominent figure in the maritime industry, celebrated for his expertise, advisory role, and entrepreneurial ventures that have made a significant impact on the maritime sector. With a rich and diverse career, he currently serves as the Chief Operating Officer (COO) of Allianz Stanford Marine, a company that has achieved remarkable success, reaching a valuation of over 250 million USD upon its recent acquisition by Shuaa Capital in February 2022.\n" +
    "\n" +
    "Pioneering Maritime Ventures:\n" +
    "\n" +
    "In August 2019, Karim embarked on a groundbreaking entrepreneurial journey by founding Marihub Operating Company FZE DMCC. Marihub stands as the region's first online marketplace tailored to serve ships and vessels, revolutionizing the maritime industry in the process. Marihub efficiently facilitates operations for approximately 150 vessels on a monthly basis, catering to ports in the UAE, Saudi Arabia, Oman, and Qatar. Karim's visionary leadership has brought innovation and connectivity to the maritime ecosystem, bridging ship owners, ports, and local service providers.\n" +
    "\n" +
    "A Trailblazer from the Beginning:\n" +
    "\n" +
    "Karim's journey to becoming a maritime expert began early in his career. He played instrumental roles in several mega projects within the United Arab Emirates while working for esteemed organizations such as the National Marine Dredging Company and Allianz Middle East Ship Management. Notable projects include the construction and installation of facilities for Upper Zakum Artificial Islands (2011-2021), the Das Island Development Project (2011-2013), SARB Oilfield Development Project (2013-2014), construction of Hail and Gasha Artificial Islands (2019-Present), Marine Transportation scope of Dubai Eye (2016-2018), and many more. These projects have significantly contributed to the growth and prosperity of the UAE, aligning with the country's vision under the wise leadership of its leaders.\n" +
    "\n" +
    "Key Collaborations and Impactful Relationships:\n" +
    "\n" +
    "Throughout his career, Karim has maintained direct and strategic communications with major local contractors and esteemed clients such as ADNOC, Abu Dhabi Ports, DP World, among others. His ability to forge strong partnerships and deliver major projects has positively impacted the economy and growth of the United Arab Emirates, reinforcing his reputation as a trusted maritime expert and leader.\n" +
    "\n" +
    "Entrepreneurship and Industry Transformation:\n" +
    "\n" +
    "Beyond his role as a head of operations and logistics, Karim is a forward-thinking entrepreneur. Through Marihub, he envisions a more interconnected maritime industry, fostering relationships between ship owners, ports, and local service providers in the UAE. His innovative approach builds a network that creates value for all users of the portal, fostering collaboration and efficiency in the maritime ecosystem.\n" +
    "\n" +
    "Karim Hasab El-Nabi's enduring commitment to innovation, excellence, and industry transformation has solidified his place as a visionary leader in the maritime sector. His contributions continue to shape the future of maritime operations and connectivity, positioning him as a driving force in the industry."
  ]

  openModalBoard(number: number, name: string, title: string, imgPath: string) {
    this._dialog.open(DialogBoardComponent, {
      data: {
        name: name,
        title: title,
        description: this.boards[number],
        imgPath: imgPath
      }
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

export interface IServices {
  iconPath?: string;
  name?: string;
  backgroundImagePath?: string;
  backgroundColor?: string;
  image?: string;
  description?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'seascope';
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
  protected readonly servicesDescription: string[] = [
    "Reinforcing Waves of Influence: Effective public relations is more than just sending out press releases. It's about creating waves of influence that ripple throughout the maritime industry. With our PR Strategy Development service, we develop a tailored media outreach plan that positions you as an industry leader and generates buzz. From securing media coverage in leading maritime publications to facilitating thought leadership opportunities, we ensure your message reaches the right audiences, amplifying your influence and elevating your brand's reputation.\n",
    "Unleashing Your Maritime Potential: We dive deep into the intricacies of your operations, identifying areas for improvement, and developing tailored strategies to elevate your performance. The power of connections cannot be underestimated in the maritime industry. Our dedicated team specializes in forging strategic alliances and creating valuable networking opportunities for your business. We facilitate introductions, organize industry-specific events, and leverage our extensive network to connect you with key stakeholders, decision-makers, and industry influencers. Together, we navigate the waters of collaboration, fostering partnerships that open new horizons and drive mutual success.",
    "Swift and Strategic Response: When a crisis hits, time is of the essence. Our Maritime Crisis Management service equips you with a well-defined crisis response plan tailored to your specific needs. We provide real-time monitoring, rapid assessment, and clear communication protocols to ensure a swift and strategic response. Our team stands by your side, offering expert guidance and support throughout the crisis, helping you navigate the complexities and minimize the impact on your operations and reputation.",
    "Mapping Your Brand's Voyage: At SeaScope, we understand that every brand has a unique story to tell. Our Reputation and Strategic Positioning service begins with a deep dive into your business, market, and target audience. We analyze your brand's DNA, uncovering its core values, strengths, and differentiators. With this knowledge, we create a strategic roadmap that charts the course for your brand's voyage, ensuring that every step aligns with your overarching vision and goals.",
    "Data-driven Decision Making: In the maritime industry, data is a valuable asset. Our Market Analysis and Technical Research service empowers you to make data-driven decisions. We gather, analyze, and interpret market and technical data to provide you with actionable insights. Whether you need to evaluate investment opportunities, assess market entry strategies, or optimize your operational efficiency, our research equips you with the knowledge required to make informed choices that drive success.",
    "Setting Sail with a Clear Vision: At SeaScope, we believe that strategic planning begins with a clear vision. Our experts work closely with you to understand your business goals, aspirations, and unique challenges. We analyze market dynamics, industry trends, and competitive landscapes to gain comprehensive insights. With this knowledge, we collaboratively develop a strategic framework that aligns your vision with actionable goals and milestones, setting the course for your maritime success.",
    "Enhancing Knowledge and Expertise: At SeaScope, we understand that knowledge is power. Our Maritime Training and Development service offers a wide range of tailored training programs designed to enhance the knowledge and expertise of maritime professionals. Whether it's ship management, maritime law and regulations, safety and security protocols, or environmental sustainability, our experienced trainers deliver engaging and informative sessions that equip participants with the latest industry insights and best practices. By investing in training, you empower your workforce to navigate the complexities of the maritime industry with confidence and competence.",
    "Image",
    "Holistic Performance Evaluation: At SeaScope, we believe that true business success extends beyond financial metrics. Our Business Performance Measurement service takes a holistic approach, evaluating multiple dimensions of your maritime business. We analyze key performance indicators (KPIs) related to financial performance, operational efficiency, customer satisfaction, employee engagement, and more. By considering a wide range of metrics, we provide you with a comprehensive view of your business performance, enabling you to make data-driven decisions and foster continuous improvement.\n",
    "Navigating Towards a Greener Maritime Future: As the maritime industry evolves, embracing sustainability and energy transition is no longer an option—it's a strategic imperative. At SeaScope, our Sustainability and Energy Transition service empowers maritime businesses to navigate the path towards a greener future. We provide comprehensive solutions and expert guidance to help you embrace sustainability practices, reduce environmental impact, and seize the opportunities presented by the global energy transition.",
    "Image"
  ]
  protected readonly services: IServices[] = []

  constructor(private readonly _dialog: MatDialog) {
  }

  asset(png: string) {
    return `assets/${png}`;
  }


  ngOnInit(): void {
    this.generateServices();
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
        description: this.servicesDescription[i - 1]
      })
    }
  }

  openModal(service: IServices) {
    this._dialog.open(DialogComponent, {
      data: service,
    })
  }
}

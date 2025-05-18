export const MOCK_API_RESPONSE = {
    topic: "Placeholder: Topic from API",
    agents: {
        for: {
            name: "Pro-Argument AI (LogiBot)",
            persona: "Analytical Optimist",
            arguments: [
                {
                    id: "for-arg-0",
                    phase: "Opening Statement",
                    text: "AI, when thoughtfully integrated, can significantly enhance educational paradigms by offering deeply personalized learning paths, unprecedented scalability, and consistently high-quality content delivery. This makes superior education more accessible and efficient globally.",
                    references: ["Smith, J. (2023). AI in Education.", "Doe, A. (2022). Personalized Learning Futures."],
                    analysis: { tone: "Optimistic", bias: "Pro-Technology", argumentType: "Logos" },
                    agrees: 15,
                    disagrees: 3
                },
                {
                    id: "for-arg-1",
                    phase: "Rebuttal 1",
                    text: "Addressing concerns about the 'human touch,' AI systems are not intended to wholly replace educators but to augment their capabilities. They can automate administrative tasks and provide data-driven insights, freeing up teachers to focus on mentorship, critical thinking development, and emotional support – areas where human interaction is paramount.",
                    references: ["Lee, C. (2023). Teacher Augmentation via AI."],
                    analysis: { tone: "Reassuring", bias: "Collaborative", argumentType: "Logos" },
                    agrees: 22,
                    disagrees: 5
                },
                {
                    id: "for-arg-2",
                    phase: "Concluding Remarks",
                    text: "In conclusion, the strategic implementation of AI in education is not about replacement but revolution. It promises a future where every student can receive tailored support, empowering both learners and educators to achieve greater outcomes.",
                    references: ["Global Education Report (2024). AI Chapter."],
                    analysis: { tone: "Persuasive", bias: "Pro-Adoption", argumentType: "Pathos" },
                    agrees: 30,
                    disagrees: 2
                }
            ]
        },
        against: {
            name: "Con-Argument AI (Critica)",
            persona: "Cautious Humanist",
            arguments: [
                {
                    id: "against-arg-0",
                    phase: "Opening Statement",
                    text: "The irreplaceable value of human educators—their empathy, ability to inspire, and nuanced understanding of individual student needs—cannot be replicated by algorithms. Over-reliance on AI risks creating a sterile, impersonal learning environment detrimental to holistic development.",
                    references: ["Johnson, M. (2023). The Human Element.", "Williams, S. (2022). Risks of AI."],
                    analysis: { tone: "Concerned", bias: "Anti-Overreliance", argumentType: "Pathos" },
                    agrees: 18,
                    disagrees: 4
                },
                {
                    id: "against-arg-1",
                    phase: "Rebuttal 1",
                    text: "While AI can process data rapidly, it inherently lacks the qualitative judgment and ethical reasoning crucial for education. Issues of algorithmic bias, data privacy, and the potential for AI to reinforce existing inequalities are significant concerns that current technology cannot adequately address.",
                    references: ["O'Neil, C. (2016). Weapons of Math Destruction."],
                    analysis: { tone: "Critical", bias: "Concerned about Ethics", argumentType: "Logos" },
                    agrees: 25,
                    disagrees: 7
                },
                {
                    id: "against-arg-2",
                    phase: "Concluding Remarks",
                    text: "Ultimately, while AI can be a useful tool, it must remain supplementary. Prioritizing technology over fundamental human interaction in education could compromise the very essence of learning: fostering critical, compassionate, and well-rounded individuals.",
                    references: ["UNESCO (2023). AI and Education."],
                    analysis: { tone: "Warning", bias: "Pro-Human Centered", argumentType: "Ethos" },
                    agrees: 20,
                    disagrees: 3
                }
            ]
        }
    }
};
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { personalInfo } from '../../data/personalInfo';
import { skills } from '../../data/skills';
import { projects } from '../../data/projects';
import { timelineEvents } from '../../data/timeline';
import { certificates } from '../../data/certificates';

// Enhanced professional styles with better spacing
const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#2d3748',
        backgroundColor: '#ffffff',
    },

    // HEADER SECTION
    header: {
        marginBottom: 30,
        paddingBottom: 20,
        borderBottomWidth: 3,
        borderBottomColor: '#667eea',
    },
    name: {
        fontSize: 32,
        fontFamily: 'Helvetica-Bold',
        color: '#1a202c',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    role: {
        fontSize: 13,
        color: '#667eea',
        marginBottom: 6,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    tagline: {
        fontSize: 9.5,
        color: '#718096',
        fontStyle: 'italic',
        marginBottom: 12,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 18,
        marginTop: 10,
    },
    contactItem: {
        fontSize: 9,
        color: '#4a5568',
        textDecoration: 'none',
    },

    // SECTION STYLES
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 13,
        fontFamily: 'Helvetica-Bold',
        color: '#667eea',
        marginBottom: 15,
        paddingBottom: 6,
        borderBottomWidth: 2,
        borderBottomColor: '#667eea',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },

    // CONTENT BLOCKS
    contentBlock: {
        marginBottom: 16,
        paddingLeft: 8,
    },
    contentBlockLast: {
        marginBottom: 0,
    },

    // ROW LAYOUTS
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        alignItems: 'baseline',
    },

    // TEXT STYLES
    boldText: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 11,
        color: '#2d3748',
    },
    dateText: {
        fontSize: 9,
        color: '#667eea',
        fontFamily: 'Helvetica-Bold',
    },
    organizationText: {
        fontFamily: 'Helvetica-Oblique',
        fontSize: 10,
        color: '#4a5568',
        marginBottom: 4,
    },
    description: {
        marginTop: 4,
        fontSize: 9.5,
        color: '#4a5568',
        lineHeight: 1.6,
        textAlign: 'justify',
    },

    // SUMMARY SECTION
    summaryText: {
        fontSize: 10,
        color: '#4a5568',
        lineHeight: 1.7,
        textAlign: 'justify',
    },

    // BULLET POINTS
    achievementsContainer: {
        marginTop: 6,
        marginLeft: 4,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 3,
        paddingLeft: 4,
    },
    bullet: {
        width: 12,
        fontSize: 8,
        color: '#667eea',
        fontFamily: 'Helvetica-Bold',
    },
    bulletText: {
        flex: 1,
        fontSize: 9,
        color: '#4a5568',
        lineHeight: 1.5,
    },

    // PROJECT STYLES
    projectBlock: {
        marginBottom: 16,
        paddingLeft: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#667eea',
        paddingTop: 2,
        paddingBottom: 2,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        alignItems: 'center',
    },
    projectCategory: {
        fontSize: 8.5,
        color: '#ffffff',
        backgroundColor: '#667eea',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
        fontFamily: 'Helvetica-Bold',
    },
    techStack: {
        fontSize: 8.5,
        color: '#667eea',
        marginTop: 6,
        fontFamily: 'Helvetica-Bold',
    },
    techStackText: {
        fontSize: 8.5,
        color: '#4a5568',
    },

    // SKILLS SECTION
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    skillTag: {
        fontSize: 9,
        backgroundColor: '#f7fafc',
        color: '#2d3748',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        fontFamily: 'Helvetica',
    },

    // CERTIFICATE STYLES
    certBlock: {
        marginBottom: 14,
        paddingLeft: 8,
        backgroundColor: '#f9fafb',
        padding: 12,
        borderRadius: 4,
    },
    certHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
    },
    certTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 10.5,
        color: '#2d3748',
        flex: 1,
        marginRight: 10,
    },
    certOrg: {
        fontSize: 9,
        color: '#718096',
        fontFamily: 'Helvetica-Oblique',
    },
    certDate: {
        fontSize: 9,
        color: '#667eea',
        fontFamily: 'Helvetica-Bold',
        marginLeft: 15,
        minWidth: 35,
        textAlign: 'right',
    },
});

// Helper to filter unique skills
const uniqueSkills = skills.reduce((acc, current) => {
    const x = acc.find(item => item.name === current.name);
    if (!x) {
        return acc.concat([current]);
    }
    return acc;
}, []);

const CVDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* HEADER SECTION */}
            <View style={styles.header}>
                <Text style={styles.name}>{personalInfo.name}</Text>
                <Text style={styles.role}>{personalInfo.title}</Text>
                <Text style={styles.tagline}>{personalInfo.tagline}</Text>

                <View style={styles.contactRow}>
                    <Link
                        src={`mailto:${personalInfo.email}`}
                        style={styles.contactItem}
                    >
                        ✉ {personalInfo.email}
                    </Link>
                    <Link
                        src={personalInfo.linkedin}
                        style={styles.contactItem}
                    >
                        🔗 LinkedIn Profile
                    </Link>
                    <Link
                        src={personalInfo.github}
                        style={styles.contactItem}
                    >
                        💻 GitHub Profile
                    </Link>
                    <Text style={styles.contactItem}>📍 {personalInfo.location}</Text>
                </View>
            </View>

            {/* PROFILE SUMMARY */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile Summary</Text>
                <Text style={styles.summaryText}>{personalInfo.bio}</Text>
            </View>

            {/* EXPERIENCE & EDUCATION */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience & Education</Text>
                {timelineEvents.map((item, index) => (
                    <View
                        key={item.id}
                        style={[
                            styles.contentBlock,
                            index === timelineEvents.length - 1 && styles.contentBlockLast
                        ]}
                    >
                        <View style={styles.rowHeader}>
                            <Text style={styles.boldText}>{item.title}</Text>
                            <Text style={styles.dateText}>{item.year}</Text>
                        </View>
                        <Text style={styles.organizationText}>{item.organization}</Text>
                        <Text style={styles.description}>{item.description}</Text>

                        {item.achievements && item.achievements.length > 0 && (
                            <View style={styles.achievementsContainer}>
                                {item.achievements.map((achievement, i) => (
                                    <View key={i} style={styles.bulletPoint}>
                                        <Text style={styles.bullet}>▸</Text>
                                        <Text style={styles.bulletText}>{achievement}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </View>

            {/* KEY PROJECTS */}
            <View break style={styles.section}>
                <Text style={styles.sectionTitle}>Key Projects</Text>
                {projects.map((project, index) => (
                    <View
                        key={project.id}
                        style={[
                            styles.projectBlock,
                            index === projects.length - 1 && { marginBottom: 0 }
                        ]}
                    >
                        <View style={styles.projectHeader}>
                            <Text style={styles.boldText}>{project.title}</Text>
                            <Text style={styles.projectCategory}>
                                {Array.isArray(project.category)
                                    ? project.category.join(' / ')
                                    : project.category}
                            </Text>
                        </View>
                        <Text style={styles.description}>{project.description}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 6 }}>
                            <Text style={styles.techStack}>Stack: </Text>
                            <Text style={styles.techStackText}>
                                {project.technologies.join(', ')}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* TECHNICAL SKILLS */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Technical Skills</Text>
                <View style={styles.skillsGrid}>
                    {uniqueSkills.map((skill, index) => (
                        <Text key={index} style={styles.skillTag}>
                            {skill.name}
                        </Text>
                    ))}
                </View>
            </View>

            {/* CERTIFICATIONS */}
            <View break style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {certificates.map((cert, index) => (
                    <View
                        key={index}
                        style={[
                            styles.certBlock,
                            index === certificates.length - 1 && { marginBottom: 0 }
                        ]}
                    >
                        <View style={styles.certHeader}>
                            <Text style={styles.certTitle}>{cert.title}</Text>
                            <Text style={styles.certDate}>{cert.date}</Text>
                        </View>
                        <Text style={styles.certOrg}>{cert.issuingOrg}</Text>
                    </View>
                ))}
            </View>

        </Page>
    </Document>
);

export default CVDocument;
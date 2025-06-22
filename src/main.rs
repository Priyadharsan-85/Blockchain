use printpdf::*;
use std::fs::File;
use std::io::{self, Write};
use std::io::BufWriter;

fn calculate_average(total_marks: f64, num_subjects: f64) -> f64 {
    total_marks / num_subjects
}

fn assign_grade(average: f64) -> &'static str {
    if average >= 90.0 {
        "A"
    } else if average >= 75.0 {
        "B"
    } else if average >= 60.0 {
        "C"
    } else {
        "D"
    }
}

fn main() {
    let mut name = String::new();
    let mut total_marks = String::new();
    let mut num_subjects = String::new();

    println!("Enter student's name:");
    io::stdin().read_line(&mut name).unwrap();
    let name = name.trim();

    println!("Enter total marks:");
    io::stdin().read_line(&mut total_marks).unwrap();
    let total_marks: f64 = total_marks.trim().parse().unwrap();

    println!("Enter number of subjects:");
    io::stdin().read_line(&mut num_subjects).unwrap();
    let num_subjects: f64 = num_subjects.trim().parse().unwrap();

    let average = calculate_average(total_marks, num_subjects);
    let grade = assign_grade(average);

    println!("\n--- Report Card ---");
    println!("Name: {}", name);
    println!("Total Marks: {}", total_marks);
    println!("Number of Subjects: {}", num_subjects);
    println!("Average: {:.2}", average);
    println!("Grade: {}", grade);
    let (doc, page1, layer1) = PdfDocument::new(
        "Report Card",
        Mm(210.0),
        Mm(297.0),
        "Layer 1",
    );
    let current_layer = doc.get_page(page1).get_layer(layer1);
    let font = doc.add_builtin_font(BuiltinFont::Helvetica).unwrap();

    let lines = vec![
        format!("Report Card"),
        String::new(),
        format!("Name: {}", name),
        format!("Total Marks: {}", total_marks),
        format!("Number of Subjects: {}", num_subjects),
        format!("Average: {:.2}", average),
        format!("Grade: {}", grade),
        String::new(),
        String::from("--- Details Entered ---"),
        format!("Entered student's name: {}", name),
        format!("Entered total marks: {}", total_marks),
        format!("Entered number of subjects: {}", num_subjects),
    ];
    let mut y = 270.0;
    for line in lines {
        current_layer.use_text(line, 18.0, Mm(20.0), Mm(y), &font);
        y -= 15.0;
    }
    let mut file = BufWriter::new(File::create("report_card.pdf").unwrap());
    doc.save(&mut file).unwrap();
    println!("\nPDF report card generated: report_card.pdf");
}